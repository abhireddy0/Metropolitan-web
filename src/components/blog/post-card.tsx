import Link from "next/link";
import { ArrowUpRightIcon, CalendarBlankIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/collections";
import { cn } from "@/lib/utils";

export const formatDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });

const shortDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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

// Mirrors the reference design's blog card: fixed-height cover, pill category, two-line title and summary,
// and an up-right arrow button that fills green while the card is hovered.
export function BlogCard({ post, eager = false }: { post: Post; eager?: boolean }) {
  const href = `/blog/${post.slug}`;
  return (
    <Card className="group h-full gap-6 py-6 shadow-none">
      <CardContent className="flex h-full flex-col gap-3 px-6">
        <Link href={href} tabIndex={-1} className="mb-3 block overflow-hidden rounded-lg">
          <PostCover post={post} eager={eager} className="h-59.5 transition-transform duration-300 group-hover:scale-105" />
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="h-auto rounded-full border-0 bg-primary/10 px-2 py-0.5 text-sm text-primary">{post.category}</Badge>
        </div>
        <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="line-clamp-2 text-base text-muted-foreground">{post.summary}</p>
        <div className="mt-auto flex items-center justify-between py-1">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarBlankIcon className="-mt-0.5 size-4.5" />
            <time dateTime={post.date}>{shortDate(post.date)}</time>
          </span>
          <Link
            href={href}
            className="inline-flex size-8 items-center justify-center rounded-lg border bg-background shadow-xs transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowUpRightIcon className="size-4" />
            <span className="sr-only">Read more: {post.title}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
