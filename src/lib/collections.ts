import "server-only";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import testimonialData from "../../content/testimonials.json";

export type Body = { html: string; sections: { id: string; text: string }[] };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  cover: string;
  coverAlt: string;
  legacyId?: number;
  order: number;
  readingTime: number;
  body: Body;
};

export type LegalPage = { slug: string; title: string; description: string; body: Body };

export type Testimonial = { quote: string; name: string; role: string; location: string };

const root = process.cwd();
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Value = string | number | boolean;
function frontMatter(src: string): [Record<string, Value>, string] {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return [{}, src];
  const data: Record<string, Value> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*?)(\s+#.*)?$/);
    if (!kv) continue;
    const v = kv[2].trim().replace(/^["']|["']$/g, "");
    data[kv[1]] = v === "true" ? true : v === "false" ? false : /^-?\d+$/.test(v) ? Number(v) : v;
  }
  return [data, m[2]];
}

const inline = (t: string) => esc(t)
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, href) => `<a href="${href}"${/^https?:/.test(href) ? ' rel="noopener" target="_blank"' : ""}>${txt}</a>`);

function markdown(src: string): Body {
  const out: string[] = [];
  const sections: Body["sections"] = [];
  let para: string[] = [], list: string[] | null = null, quote: string[] = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`); list = null; } };
  // Consecutive ">" lines keep their line breaks (used for postal addresses in the legal pages).
  const flushQuote = () => { if (quote.length) { out.push(`<blockquote><p>${quote.map(inline).join("<br>")}</p></blockquote>`); quote = []; } };
  const flush = () => { flushPara(); flushList(); flushQuote(); };
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trimEnd();
    let m: RegExpMatchArray | null;
    if (!line.trim()) { flush(); continue; }
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flush();
      const level = m[1].length, text = m[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (level === 2) sections.push({ id, text });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { flushPara(); flushQuote(); (list ??= []).push(m[1]); continue; }
    if ((m = line.match(/^>\s?(.*)$/))) { flushPara(); flushList(); quote.push(m[1]); continue; }
    flushList(); flushQuote(); para.push(line.trim());
  }
  flush();
  return { html: out.join("\n"), sections };
}

const markdownFiles = (folder: string) => {
  const dir = join(root, "content", folder);
  return (existsSync(dir) ? readdirSync(dir) : [])
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => ({ file: f, slug: basename(f, ".md"), parts: frontMatter(readFileSync(join(dir, f), "utf8")) }));
};

function loadPosts(): Post[] {
  return markdownFiles("blog")
    .map(({ file, slug, parts: [data, body] }) => {
      if (!data.title) throw new Error(`${file}: "title" is required`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) throw new Error(`${file}: "date" must be YYYY-MM-DD`);
      if (!data.cover) throw new Error(`${file}: "cover" is required`);
      return {
        slug,
        title: String(data.title),
        summary: String(data.summary || ""),
        date: String(data.date),
        updated: String(data.updated || data.date),
        author: String(data.author || "Metropolitan clinical team"),
        category: String(data.category || "Health"),
        cover: String(data.cover),
        coverAlt: String(data.coverAlt || ""),
        legacyId: typeof data.legacyId === "number" ? data.legacyId : undefined,
        order: typeof data.order === "number" ? data.order : 100,
        readingTime: Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220)),
        body: markdown(body),
      };
    })
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date));
}

function loadLegal(): LegalPage[] {
  return markdownFiles("legal").map(({ slug, parts: [data, body] }) => ({
    slug,
    title: String(data.title),
    description: String(data.description || ""),
    body: markdown(body),
  }));
}

export const posts = loadPosts();
export const legalPages = loadLegal();
export const testimonials: Testimonial[] = testimonialData;
export const legalPage = (slug: string) => {
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`content/legal/${slug}.md is missing`);
  return page;
};
