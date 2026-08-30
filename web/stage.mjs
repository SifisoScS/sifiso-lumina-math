import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * Stages exactly the two files a learner needs, and nothing else.
 *
 * `web/` also holds the TypeScript the bundle is built from, a local dev
 * server, and this script. None of that belongs on a public host, and copying
 * the directory wholesale is how it would get there. Two files are named here,
 * so anything new in `web/` has to be named before it can ship.
 *
 * The verifier is then run against the staged bundle rather than the built one.
 * Checking one file and publishing another would be a guarantee about the
 * wrong artefact.
 */

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const out = join(root, "dist");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const file of ["index.html", "app.js"]) {
  cpSync(join(here, file), join(out, file));
}

// GitHub Pages runs everything through Jekyll unless told not to, which strips
// files beginning with an underscore and can rewrite what it does not expect.
// This page is already built; nothing should touch it again.
writeFileSync(join(out, ".nojekyll"), "");

process.stdout.write(`  staged: dist/index.html, dist/app.js\n`);
