import React from "react";

/**
 * Desos Grove — Badge
 * Compact status/count pill. Botanical semantic tones.
 */
export type BadgeTone =
  | "neutral"
  | "brand"
  | "gold"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type BadgeVariant = "soft" | "solid" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  dot = false,
  style = {},
  ...rest
}: BadgeProps) {
  const palette: Record<
    BadgeTone,
    { fg: string; soft: string; solid: string; line: string }
  > = {
    neutral: {
      fg: "var(--ink-700)",
      soft: "var(--paper-100)",
      solid: "var(--ink-700)",
      line: "var(--border-default)",
    },
    brand: {
      fg: "var(--green-700)",
      soft: "var(--green-100)",
      solid: "var(--green-700)",
      line: "var(--green-300)",
    },
    gold: {
      fg: "var(--gold-700)",
      soft: "var(--gold-100)",
      solid: "var(--gold-600)",
      line: "var(--gold-400)",
    },
    success: {
      fg: "var(--leaf-600)",
      soft: "var(--leaf-100)",
      solid: "var(--leaf-600)",
      line: "var(--leaf-500)",
    },
    warning: {
      fg: "var(--honey-600)",
      soft: "var(--honey-100)",
      solid: "var(--honey-600)",
      line: "var(--honey-500)",
    },
    danger: {
      fg: "var(--berry-600)",
      soft: "var(--berry-100)",
      solid: "var(--berry-600)",
      line: "var(--berry-500)",
    },
    info: {
      fg: "var(--sage-600)",
      soft: "var(--sage-100)",
      solid: "var(--sage-600)",
      line: "var(--sage-500)",
    },
  };
  const p = palette[tone] || palette.neutral;

  const styles: Record<BadgeVariant, React.CSSProperties> = {
    soft: { background: p.soft, color: p.fg, border: "1px solid transparent" },
    solid: {
      background: p.solid,
      color: "var(--white)",
      border: "1px solid transparent",
    },
    outline: {
      background: "transparent",
      color: p.fg,
      border: `1px solid ${p.line}`,
    },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: 22,
        padding: "0 var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)" as React.CSSProperties["fontWeight"],
        letterSpacing: "0.02em",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...styles[variant],
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: variant === "solid" ? "var(--white)" : p.solid,
          }}
        />
      )}
      {children}
    </span>
  );
}
