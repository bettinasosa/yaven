import { YavenLogo } from "yaven"

export function OnCream() {
  return (
    <div style={{ background: "var(--cream, #f5f1e4)", padding: 32, display: "inline-flex" }}>
      <YavenLogo height={80} />
    </div>
  )
}

export function OnBlue() {
  return (
    <div style={{ background: "var(--primary, #267fe5)", padding: 32, display: "inline-flex" }}>
      <YavenLogo height={80} />
    </div>
  )
}

export function Small() {
  return (
    <div
      style={{
        background: "var(--cream, #f5f1e4)",
        padding: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <YavenLogo height={28} />
      <span
        style={{
          fontFamily: "var(--font-heading), sans-serif",
          fontWeight: 600,
          fontSize: 20,
          color: "var(--ink, #07348b)",
        }}
      >
        Yaven
      </span>
    </div>
  )
}
