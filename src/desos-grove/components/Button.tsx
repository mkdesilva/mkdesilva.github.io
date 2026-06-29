import React from "react";

/**
 * Desos Grove — Button
 * Primary action component. Forest-green solid, gilt-gold accent,
 * quiet ghost/outline variants. Self-contained; styled via tokens.
 */
export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "gilt"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const heights: Record<ButtonSize, string> = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)",
  };
  const pads: Record<ButtonSize, string> = {
    sm: "0 var(--space-3)",
    md: "0 var(--space-5)",
    lg: "0 var(--space-6)",
  };
  const fonts: Record<ButtonSize, string> = {
    sm: "var(--text-sm)",
    md: "var(--text-base)",
    lg: "var(--text-md)",
  };

  const variants: Record<
    ButtonVariant,
    {
      base: React.CSSProperties;
      hover: React.CSSProperties;
      active: React.CSSProperties;
    }
  > = {
    primary: {
      base: {
        background: "var(--brand)",
        color: "var(--text-on-brand)",
        border: "1px solid transparent",
      },
      hover: { background: "var(--brand-hover)" },
      active: { background: "var(--brand-press)" },
    },
    accent: {
      base: {
        background: "var(--accent)",
        color: "var(--text-on-accent)",
        border: "1px solid transparent",
      },
      hover: { background: "var(--accent-hover)" },
      active: { background: "var(--accent-press)" },
    },
    outline: {
      base: {
        background: "transparent",
        color: "var(--text-strong)",
        border: "1px solid var(--border-strong)",
      },
      hover: {
        background: "var(--surface-sunken)",
        border: "1px solid var(--brand)",
      },
      active: { background: "var(--surface-sunken)" },
    },
    ghost: {
      base: {
        background: "transparent",
        color: "var(--text-body)",
        border: "1px solid transparent",
      },
      hover: { background: "var(--surface-sunken)" },
      active: { background: "var(--surface-sunken)" },
    },
    gilt: {
      base: {
        background: "transparent",
        color: "var(--accent)",
        border: "1px solid var(--border-gilt)",
      },
      hover: {
        background: "color-mix(in oklch, var(--gold-500) 12%, transparent)",
      },
      active: {
        background: "color-mix(in oklch, var(--gold-500) 18%, transparent)",
      },
    },
    danger: {
      base: {
        background: "var(--danger)",
        color: "var(--white)",
        border: "1px solid transparent",
      },
      hover: { background: "var(--berry-500)" },
      active: { background: "var(--berry-600)" },
    },
  };

  const v = variants[variant] || variants.primary;
  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    height: heights[size],
    padding: pads[size],
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: fonts[size],
    fontWeight: "var(--weight-semibold)" as React.CSSProperties["fontWeight"],
    letterSpacing: "0.01em",
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition:
      "background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
    transform: active && !disabled ? "translateY(0.5px) scale(0.99)" : "none",
    whiteSpace: "nowrap",
    ...v.base,
    ...(hover && !disabled ? v.hover : {}),
    ...(active && !disabled ? v.active : {}),
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {iconLeft}
      {children && <span>{children}</span>}
      {iconRight}
    </button>
  );
}
