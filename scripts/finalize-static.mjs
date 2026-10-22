import { readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
const root = path.resolve("dist/client");
const routes = [
  "/",
  "/products/pos",
  "/features",
  "/hardware",
  "/pricing",
  "/about",
  "/contact",
  "/integrations",
  "/privacy",
  "/terms",
  "/cookies",
];
await access(path.join(root, "index.html"));
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map((route) => "  <url><loc>https://aestrox.com" + route + "</loc></url>").join("\n") +
  "\n</urlset>\n";
await writeFile(path.join(root, "sitemap.xml"), sitemap);
await writeFile(
  path.join(root, "robots.txt"),
  "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /__forms.html\nSitemap: https://aestrox.com/sitemap.xml\n",
);
// Hash the actual prerendered hydration scripts. Do not require unsafe-inline
// script execution just to serve a static React site. The common hash set also
// covers client-side navigation between routes.
const scriptHashes = new Set();
for (const route of [...routes, "/billing", "/404", "/thanks"]) {
  const file = path.join(root, route === "/" ? "index.html" : route.slice(1) + "/index.html");
  const originalHtml = await readFile(file, "utf8");
  // HTML parsers turn literal NUL characters into replacement characters.
  // Escape serialized route IDs before hashing so hydration receives the same
  // values as the server, and hash the line endings the browser actually sees.
  const html = originalHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) =>
    script.replace(/\u0000/g, "\\u0000").replace(/\r\n?/g, "\n"),
  );
  if (html !== originalHtml) await writeFile(file, html);
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (match[1])
      scriptHashes.add("'sha256-" + createHash("sha256").update(match[1]).digest("base64") + "'");
  }
}
// A static host may serve this at ANY unknown URL. The /404 route's serialized
// React state cannot hydrate a different pathname. Keep the fallback a complete
// static page with real navigation links, not a mismatched app bootstrap.
const notFound = await readFile(path.join(root, "404/index.html"), "utf8");
const head = notFound
  .match(/<head>([\s\S]*?)<\/head>/)?.[1]
  ?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "");
const main = notFound.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
if (!head || !main) throw new Error("The static 404 template is incomplete.");
await writeFile(
  path.join(root, "404.html"),
  `<!doctype html><html lang="en"><head>${head}</head><body>${main}</body></html>`,
);
const csp =
  "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self' " +
  [...scriptHashes].join(" ") +
  "; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests";
await writeFile(path.join(root, "_headers"), "/*\n  Content-Security-Policy: " + csp + "\n");
console.log("Static routes, 404, sitemap and hash-based CSP prepared.");
