import { cn } from "@/lib/utils";

type MediaProps = {
  /** Path under public/images without extension, e.g. "services/skilled-nursing". */
  slot: string;
  alt: string;
  width?: number;
  height?: number;
  /** Set when a 640px-wide "-640.webp" copy exists next to the image. */
  responsive?: boolean;
  sizes?: string;
  eager?: boolean;
  className?: string;
};

// Photos are pre-sized WebP files in public/images (see scripts/fetch-images.ps1), so a plain <img> with srcset is enough.
export function Media({ slot, alt, width = 1200, height = 900, responsive = width === 1200, sizes = "(max-width: 900px) 100vw, 50vw", eager = false, className }: MediaProps) {
  const src = `/images/${slot}.webp`;
  return (
    <img
      src={src}
      srcSet={responsive ? `/images/${slot}-640.webp 640w, ${src} 1200w` : undefined}
      sizes={responsive ? sizes : undefined}
      width={width}
      height={height}
      alt={alt}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      className={cn("w-full object-cover", className)}
    />
  );
}
