import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-10", className)} {...props} />;
}

const tones = {
  default: "",
  white: "bg-card",
  sand: "bg-sand",
  sage: "bg-sage",
} as const;

type SectionProps = React.ComponentProps<"section"> & { tone?: keyof typeof tones; inner?: string; tight?: boolean };

export function Section({ className, inner, tone = "default", tight = false, children, ...props }: SectionProps) {
  return (
    <section className={cn(tones[tone], className)} {...props}>
      <Container className={cn(tight ? "py-12 md:py-18" : "py-16 md:py-28", inner)}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Centred section heading; pass `children` for a link or controls shown below it. */
export function SectionHeader({ eyebrow, title, sub, id, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex flex-col items-center gap-6 text-center md:mb-14", className)}>
      <div className="grid max-w-2xl justify-items-center gap-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="text-h2 leading-[1.15]">{title}</h2>
        {sub && <p className="text-lg text-ink-2">{sub}</p>}
      </div>
      {children}
    </div>
  );
}
