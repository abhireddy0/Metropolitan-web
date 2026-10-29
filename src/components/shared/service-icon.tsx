import {
  ChatCircleDotsIcon,
  FirstAidKitIcon,
  FlowerLotusIcon,
  HandHeartIcon,
  HouseLineIcon,
  PersonSimpleWalkIcon,
  PuzzlePieceIcon,
  StethoscopeIcon,
  SyringeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, Icon> = {
  "skilled-nursing": StethoscopeIcon,
  "health-aide": HandHeartIcon,
  "social-worker": UsersThreeIcon,
  "physical-therapy": PersonSimpleWalkIcon,
  "speech-therapy": ChatCircleDotsIcon,
  "occupational-therapy": PuzzlePieceIcon,
  "specialized-care": FirstAidKitIcon,
  "palliative-care": FlowerLotusIcon,
  "infusion-therapy": SyringeIcon,
  homemaker: HouseLineIcon,
};

// Kept apart from item-icon.tsx so client components (the header menu) only bundle these ten icons.
export const tile = "grid shrink-0 place-items-center rounded-xl bg-sage text-forest";

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Glyph = serviceIcons[slug] ?? FirstAidKitIcon;
  return (
    <span aria-hidden className={cn(tile, "size-11 [&_svg]:size-6", className)}>
      <Glyph weight="duotone" />
    </span>
  );
}
