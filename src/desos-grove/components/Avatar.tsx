import React from "react";

/**
 * Desos Grove — Avatar
 * Person/studio avatar. Image, or initials on a gilt-tinted ground.
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  ring?: boolean;
}

export function Avatar({
  src,
  name = "",
  size = "md",
  shape = "circle",
  ring = false,
  style = {},
  ...rest
}: AvatarProps) {
  const dims: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };
  const d = dims[size] || dims.md;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: d,
        height: d,
        flex: "none",
        borderRadius:
          shape === "square" ? "var(--radius-md)" : "var(--radius-circle)",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--green-100)",
        color: "var(--green-700)",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-semibold)" as React.CSSProperties["fontWeight"],
        fontSize: d * 0.4,
        boxShadow: ring
          ? "0 0 0 2px var(--surface-card), 0 0 0 3.5px var(--gold-500)"
          : "none",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>{initials || "·"}</span>
      )}
    </div>
  );
}
