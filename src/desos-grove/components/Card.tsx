import React from "react";

/**
 * Desos Grove — Card
 * The signature surface: parchment/white with a soft warm shadow and an
 * optional gilt hairline edge. `tone="canopy"` renders the dark green variant.
 */
export type CardTone = "default" | "sunken" | "canopy";
export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  gilt?: boolean;
  interactive?: boolean;
  padding?: CardPadding;
}

export function Card({
  children,
  tone = "default",
  gilt = false,
  interactive = false,
  padding = "lg",
  style = {},
  onClick,
  ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);

  const pads: Record<CardPadding, string> = {
    none: "0",
    sm: "var(--space-4)",
    md: "var(--space-5)",
    lg: "var(--space-6)",
  };

  const tones: Record<CardTone, React.CSSProperties> = {
    default: { background: "var(--surface-card)", color: "var(--text-body)" },
    sunken: { background: "var(--surface-sunken)", color: "var(--text-body)" },
    canopy: { background: "var(--green-900)", color: "var(--green-100)" },
  };
  const t = tones[tone] || tones.default;

  const borderColor = gilt
    ? "color-mix(in oklch, var(--gold-500) 38%, transparent)"
    : tone === "canopy"
      ? "color-mix(in oklch, var(--gold-500) 18%, transparent)"
      : "var(--border-subtle)";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: t.background,
        color: t.color,
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-lg)",
        padding: pads[padding],
        boxShadow:
          interactive && hover
            ? tone === "canopy"
              ? "var(--shadow-lg)"
              : "var(--shadow-md)"
            : tone === "canopy"
              ? "none"
              : "var(--shadow-sm)",
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition:
          "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
