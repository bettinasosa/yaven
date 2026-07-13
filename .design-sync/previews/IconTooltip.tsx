import { IconTooltip } from "yaven"

function Pill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontSize: 12,
        fontWeight: 600,
        color: "var(--ink, #07348b)",
      }}
    >
      {label.slice(0, 2)}
    </span>
  )
}

// The tooltip bubble itself only appears on hover/focus (internal component
// state) — not capturable in a static render. This shows the icon it wraps.
export function Default() {
  return (
    <div style={{ padding: 20 }}>
      <IconTooltip label="Gmail">
        <Pill label="Gmail" />
      </IconTooltip>
    </div>
  )
}
