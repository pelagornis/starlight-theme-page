import type { BadgeVariant } from "@refineui/react";

export type StarlightBadgeVariant = "default" | "note" | "tip" | "caution" | "danger" | "success";

/** RefineUI Badge variant for each Starlight badge variant, shared by content and sidebar badges. */
export const badgeVariants: Record<StarlightBadgeVariant, BadgeVariant> = {
  default: "default",
  note: "neutral",
  tip: "default",
  caution: "warning",
  danger: "danger",
  success: "success",
};
