// Local preview of the static export that behaves like Vercel with vercel.json:
// clean URLs, redirects, real 404s.  Run after `pnpm build`:  node scripts/serve.mjs  ->  http://localhost:4321
import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const root = join(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT) || 4321;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };
const { redirects } = JSON.parse(readFileSync(join(import.meta.dirname, "..", "vercel.json"), "utf8"));

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  for (const r of redirects) {
    if (new RegExp(`^${r.source.replace(/:\w+/g, "[^/]+")}$`).test(url)) {
      res.writeHead(308, { Location: r.destination });
      return res.end();
    }
  }
  if (url.length > 1 && url.endsWith("/")) { res.writeHead(308, { Location: url.slice(0, -1) }); return res.end(); }
  if (url.endsWith(".html")) { res.writeHead(308, { Location: url.replace(/(index)?\.html$/, "") || "/" }); return res.end(); }
  for (const c of url === "/" ? ["index.html"] : [url.slice(1), `${url.slice(1)}.html`]) {
    const file = join(root, c);
    if (file.startsWith(root) && existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
      return createReadStream(file).pipe(res);
    }
  }
  res.writeHead(404, { "Content-Type": types[".html"] });
  createReadStream(join(root, "404.html")).pipe(res);
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));
