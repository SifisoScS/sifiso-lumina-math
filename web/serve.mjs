import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

/**
 * A local static server for the learner surface.
 *
 * Bound to 127.0.0.1 on purpose: the page keeps a learner's record in browser
 * storage, and nothing about this surface should be reachable from anywhere
 * but this machine.
 */

const ROOT = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8" };

const server = createServer(async (request, response) => {
  const requested = (request.url ?? "/").split("?")[0];
  const relative = normalize(requested === "/" ? "index.html" : requested.slice(1));
  if (relative.startsWith("..")) {
    response.writeHead(403).end("no");
    return;
  }
  try {
    const body = await readFile(join(ROOT, relative));
    response.writeHead(200, { "content-type": TYPES[extname(relative)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("not found");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  process.stdout.write(`\n  Math Lumina is running at http://127.0.0.1:${PORT}\n`);
  process.stdout.write("  Local only. Ctrl-C to stop.\n\n");
});
