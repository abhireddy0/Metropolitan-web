import Link from "next/link";
import { CallButton } from "@/components/shared/blocks";
import { Container } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";

export function NotFoundView() {
  return (
    <section data-page="not-found">
      <Container className="py-24 text-center md:py-40">
        <p className="mb-2 font-display text-[clamp(4rem,3rem+5vw,7rem)] leading-none text-forest">404</p>
        <h1 className="mb-8 text-[clamp(1.85rem,1.4rem+1.8vw,2.6rem)] leading-[1.15]">Oops! Page not found</h1>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants()}>Return to Home</Link>
          <CallButton />
        </div>
      </Container>
    </section>
  );
}
