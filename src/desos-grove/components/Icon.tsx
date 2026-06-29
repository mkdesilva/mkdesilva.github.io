import {
  Sprout,
  ArrowRight,
  AppWindow,
  Gamepad2,
  Smartphone,
  Check,
  Droplets,
  Trees,
  type LucideIcon,
} from "lucide-react";

/**
 * Desos Grove uses Lucide — its thin, single-weight stroke is the closest
 * match to the emblem's fine gold line-work. Stroke inherits currentColor.
 */
const ICONS: Record<string, LucideIcon> = {
  sprout: Sprout,
  "arrow-right": ArrowRight,
  "app-window": AppWindow,
  "gamepad-2": Gamepad2,
  smartphone: Smartphone,
  check: Check,
  droplets: Droplets,
  trees: Trees,
};

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={1.8} aria-hidden />;
}
