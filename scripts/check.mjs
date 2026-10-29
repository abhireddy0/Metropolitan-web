// Site QA against the local preview (node scripts/serve.mjs must be running).
// Checks every sitemap URL for SEO essentials, broken internal links/assets, redirects and 404s.
const base = process.env.BASE || "http://localhost:4321";
const problems = [];
const notes = [];
const warn = (m) => problems.push(m);
const get = (p) => fetch(base + p, { redirect: "manual" });
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

const sm = await (await get("/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>https:\/\/emetrocare\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const titles = new Map(), descs = new Map();
const links = new Set(), assets = new Set();

for (const u of urls) {
  const res = await get(u);
  if (res.status !== 200) { warn(`${u}: status ${res.status}`); continue; }
  const html = await res.text();
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  // Titles/descriptions are the old site's wording; long ones are reported as notes, not failures.
  if (!title) warn(`${u}: missing title`); else if (title.length > 65) notes.push(`${u}: title ${title.length} chars`);
  if (!desc) warn(`${u}: missing description`); else if (desc.length > 165) notes.push(`${u}: description ${desc.length} chars`);
  if (canon !== "https://emetrocare.com" + (u === "/" ? "" : u)) warn(`${u}: canonical ${canon}`);
  if (h1s !== 1) warn(`${u}: ${h1s} h1 elements`);
  if (!html.includes('property="og:image"')) warn(`${u}: no og:image`);
  if (titles.has(title)) warn(`${u}: duplicate title with ${titles.get(title)}`);
  titles.set(title, u);
  if (descs.has(desc)) warn(`${u}: duplicate description with ${descs.get(desc)}`);
  descs.set(desc, u);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(m[0])) warn(`${u}: img without alt ${m[0].slice(0, 80)}`);
    if (/\balt=""/.test(m[0]) && !/aria-hidden/.test(m[0])) warn(`${u}: img with empty alt ${m[0].slice(0, 80)}`);
    if (!/\bwidth="\d+"/.test(m[0]) || !/\bheight="\d+"/.test(m[0])) warn(`${u}: img without dimensions ${m[0].slice(0, 80)}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { warn(`${u}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)[^"]*"/g)) if (!m[1].startsWith("/_next/")) links.add(m[1]);
  for (const m of html.matchAll(/(?:src|srcSet|srcset)="([^"]+)"/g)) m[1].split(",").map((s) => s.trim().split(" ")[0]).filter((s) => s.startsWith("/")).forEach((s) => assets.add(s));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) warn(`${u}: duplicate id ${id}`);
}

for (const l of [...links, ...assets, "/robots.txt", "/llms.txt", "/manifest.webmanifest"]) {
  const r = await get(l);
  if (r.status !== 200) warn(`link ${l}: status ${r.status}`);
}

const redirects = [["/blog/1", "/blog/future-of-home-healthcare"], ["/blog/2", "/blog/medicare-coverage-home-health-care"], ["/awards", "/certificates"], ["/services/home-maker", "/services/homemaker"], ["/insurance/medicare", "/insurance"], ["/about/", "/about"], ["/logo.png", "/images/logos/logo.png"]];
for (const [from, to] of redirects) {
  const r = await get(from);
  if (r.status !== 308 || r.headers.get("location") !== to) warn(`redirect ${from}: ${r.status} -> ${r.headers.get("location")} (expected ${to})`);
}
const nf = await get("/this-page-does-not-exist");
if (nf.status !== 404) warn(`unknown URL returned ${nf.status}`);
if (!(await nf.text()).includes("noindex")) warn("404 page is indexable");

console.log(`Checked ${urls.length} pages, ${links.size} internal links, ${assets.size} assets, ${redirects.length} redirects.`);
if (notes.length) console.log(`Notes (Google may truncate in results):\n- ${notes.join("\n- ")}`);
console.log(problems.length ? `PROBLEMS (${problems.length}):\n- ${problems.join("\n- ")}` : "All checks passed.");
process.exitCode = problems.length ? 1 : 0;
