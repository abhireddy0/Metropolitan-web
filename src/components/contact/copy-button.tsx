"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-2 h-8 px-3 text-sm")}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
