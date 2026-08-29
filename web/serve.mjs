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

// Reported from the address actually bound, not from the port that was asked
// for. A listen callback is a one-time "listening" listener, so the one from a
// failed attempt survives to fire on the successful one -- which had this
// announcing a URL that was not serving anything.
server.on("listening", () => {
  const { port } = server.address();
  process.stdout.write(`\n  Math Lumina is running at http://127.0.0.1:${port}\n`);
  process.stdout.write("  Local only. Ctrl-C to stop.\n\n");
});

function listen(port, attemptsLeft) {
  server.once("error", (error) => {
    // A port left busy by an earlier run is an ordinary thing to walk into, and
    // answering it with an unhandled 'error' event and a stack trace is not a
    // useful reply. Step along the range, and say which port was taken.
    if (error.code !== "EADDRINUSE") throw error;
    if (attemptsLeft > 0) {
      process.stdout.write(`  port ${port} is in use - trying ${port + 1}\n`);
      listen(port + 1, attemptsLeft - 1);
      return;
    }
    process.stderr.write(`\n  Ports ${PORT} to ${port} are all in use.\n`);
    process.stderr.write("  Something is still running from an earlier session,\n");
    process.stderr.write("  or set PORT to choose another.\n\n");
    process.exit(1);
  });

  server.listen(port, "127.0.0.1");
}

listen(PORT, 12);
