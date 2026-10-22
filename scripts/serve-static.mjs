import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
const root = path.resolve("dist/client");
const port = Number(process.env.PORT || 4311);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(501, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Use Netlify Dev for server functions and forms." }));
      return;
    }
    try {
      // Reload generated security headers after a local rebuild.
      const headers = await readFile(path.join(root, "_headers"), "utf8").catch(() => "");
      const csp = headers.match(/Content-Security-Policy: (.+)/)?.[1];
      const url = new URL(request.url, "http://localhost");
      const target = path.resolve(root, "." + decodeURIComponent(url.pathname));
      if (!target.startsWith(root + path.sep) && target !== root) {
        response.writeHead(403);
        response.end();
        return;
      }
      let file = target;
      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
        await stat(file);
      } catch {
        file = path.join(root, "404.html");
        status = 404;
      }
      const content = await readFile(file);
      response.writeHead(status, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        ...(csp
          ? { "Content-Security-Policy": csp.replace("; upgrade-insecure-requests", "") }
          : {}),
      });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(400);
      response.end("Invalid request");
    }
  })
  .listen(port, "127.0.0.1", () => console.log("Static preview: http://127.0.0.1:" + port));
