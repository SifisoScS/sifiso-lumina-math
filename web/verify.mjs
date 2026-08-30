import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * The learner surface must have no way to reach a network.
 *
 * It is not enough that the app does not call out; the surface must not contain
 * the means. The engine's provider adapter lives behind `src/index.ts`, so
 * importing the decisioning modules directly is what keeps it out -- and a
 * careless import would put it back without anyone noticing.
 *
 * Both files are checked, and that is not symmetry for its own sake. This
 * originally read the bundle only, which left the page itself unguarded: a
 * stylesheet from a font host, an analytics tag, or an icon from a CDN would
 * have passed, and a page that fetches a font has told someone that a learner
 * opened it. The bundle is where a network call would be written; the page is
 * where one would be pasted.
 *
 * Takes a directory so the same check can run against the artefact that is
 * actually published. Verifying the build output and then shipping a different
 * file would be a guarantee about the wrong thing.
 */

const FORBIDDEN_IN_BUNDLE = [
  ["anthropic", "the provider adapter"],
  ["api.anthropic.com", "a provider endpoint"],
  ["XMLHttpRequest", "an XHR call"],
  ["WebSocket", "a socket"],
  ["navigator.sendBeacon", "a beacon"],
  ["fetch(", "a fetch call"],
  ["import(", "a dynamic import"],
];

const FORBIDDEN_IN_PAGE = [
  ["http://", "a link to somewhere else"],
  ["https://", "a link to somewhere else"],
  ["//fonts.", "a font host"],
  ["srcset=", "an image loaded from elsewhere"],
  ["<iframe", "an embedded page"],
];

const here = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2] ?? here;

const found = [];

function scan(file, rules) {
  const path = join(target, file);
  const text = readFileSync(path, "utf8");
  const lowered = text.toLowerCase();
  for (const [needle, what] of rules) {
    if (lowered.includes(needle.toLowerCase())) found.push([file, needle, what]);
  }
  return text.length;
}

const bundleSize = scan("app.js", FORBIDDEN_IN_BUNDLE);
const pageSize = scan("index.html", FORBIDDEN_IN_PAGE);

if (found.length > 0) {
  for (const [file, needle, what] of found) {
    process.stderr.write(`  ${file} now contains ${what} (${needle})\n`);
  }
  process.stderr.write("\n  This page keeps a learner's record. It must not be able to send it\n");
  process.stderr.write("  anywhere, and it must not tell anyone that a learner opened it.\n");
  process.exit(1);
}

const kb = Math.round((bundleSize + pageSize) / 1024);
process.stdout.write(`  verified: no network path in ${target} (${kb} KB, page and bundle)\n`);
