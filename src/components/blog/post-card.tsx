import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Post } from "@/lib/collections";
import { cn } from "@/lib/utils";

export const formatDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });

// Covers live in public/images/blog as 1200x675 WebP with a -640 copy for small screens.
export function PostCover({ post, eager = false, sizes = "(max-width: 640px) 100vw, 400px", className }: { post: Post; eager?: boolean; sizes?: string; className?: string }) {
  const small = post.cover.replace(/\.webp$/, "-640.webp");
  return (
    <img
      src={post.cover}
      srcSet={post.cover.endsWith(".webp") ? `${small} 640w, ${post.cover} 1200w` : undefined}
      sizes={sizes}
      width={1200}
      height={675}
      alt={post.coverAlt}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      className={cn("w-full object-cover", className)}
    />
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <PostCover post={post} className="mb-4 aspect-16/10 rounded-lg" />
      <p className="mb-2 text-[0.825rem] font-semibold tracking-[0.06em] text-leaf uppercase">{post.category}</p>
      <h3 className="mb-2 font-display text-[1.35rem] leading-tight font-medium group-hover:text-leaf">{post.title}</h3>
      <p className="text-[0.975rem] text-muted-foreground">{post.summary}</p>
    </Link>
  );
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group mb-14 grid items-center gap-8 border-b pb-14 md:mb-18 md:pb-18 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <PostCover post={post} eager sizes="(max-width: 1024px) 100vw, 640px" className="aspect-16/10 rounded-2xl" />
      <div>
        <p className="eyebrow mb-4">{post.category}</p>
        <h2 className="mb-4 text-[clamp(1.75rem,1.4rem+1.4vw,2.4rem)] leading-[1.15] group-hover:text-leaf">{post.title}</h2>
        <p className="mb-5 text-lg text-ink-2">{post.summary}</p>
        <span className="inline-flex items-center gap-1.5 font-semibold text-leaf">
          Read article <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
