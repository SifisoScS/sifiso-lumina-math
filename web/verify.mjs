import { readFileSync } from "node:fs";

/**
 * The learner surface must have no way to reach a network.
 *
 * It is not enough that the app does not call out; the bundle must not contain
 * the means. The engine's provider adapter lives behind `src/index.ts`, so
 * importing the decisioning modules directly is what keeps it out -- and a
 * careless import would put it back without anyone noticing.
 */

const FORBIDDEN = [
  ["anthropic", "the provider adapter"],
  ["api.anthropic.com", "a provider endpoint"],
  ["XMLHttpRequest", "an XHR call"],
  ["WebSocket", "a socket"],
  ["navigator.sendBeacon", "a beacon"],
  ["fetch(", "a fetch call"],
];

const bundle = readFileSync(new URL("app.js", import.meta.url), "utf8");
const found = FORBIDDEN.filter(([needle]) => bundle.toLowerCase().includes(needle.toLowerCase()));

if (found.length > 0) {
  for (const [needle, what] of found) {
    process.stderr.write(`  the learner surface now contains ${what} (${needle})\n`);
  }
  process.stderr.write("\n  This page keeps a learner's record. It must not be able to send it anywhere.\n");
  process.exit(1);
}

process.stdout.write(`  verified: no network path in the bundle (${Math.round(bundle.length / 1024)} KB)\n`);
