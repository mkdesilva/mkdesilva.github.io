import React from "react";

/**
 * Desos Grove — Tag
 * Removable/selectable keyword chip. Lower-key than Badge; for filters,
 * categories, tech labels.
 */
interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  iconLeft?: React.ReactNode;
}

export function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  iconLeft = null,
  style = {},
  ...rest
}: TagProps) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: 28,
        padding: "0 var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)" as React.CSSProperties["fontWeight"],
        color: selected ? "var(--text-on-accent)" : "var(--text-body)",
        background: selected
          ? "var(--accent)"
          : hover && clickable
            ? "var(--surface-sunken)"
            : "var(--surface-card)",
        border: `1px solid ${selected ? "transparent" : "var(--border-default)"}`,
        borderRadius: "var(--radius-sm)",
        cursor: clickable ? "pointer" : "default",
        transition:
          "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 16,
            height: 16,
            marginRight: -2,
            padding: 0,
            border: 0,
            borderRadius: "50%",
            cursor: "pointer",
            background: "transparent",
            color: "inherit",
            opacity: 0.6,
            lineHeight: 1,
            fontSize: 14,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
