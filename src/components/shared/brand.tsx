import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className={cn("block shrink-0", className)}>
      <img src="/images/logos/logo.png" width={456} height={154} alt={site.name} className="h-11 w-auto sm:h-14" />
    </Link>
  );
}
