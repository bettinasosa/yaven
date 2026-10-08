import { GlassCard } from "yaven"

const INK = "#07348b"

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#f5f1e4",
        padding: 40,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  )
}

export function Default() {
  return (
    <Backdrop>
      <GlassCard borderRadius="20px" style={{ width: 260 }}>
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.35,
            }}
          >
            Proposal sent
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: INK, opacity: 0.8, lineHeight: 1.45 }}>
            Acme Co. — website redesign, $8,400
          </div>
        </div>
      </GlassCard>
    </Backdrop>
  )
}

export function SharpCorners() {
  return (
    <Backdrop>
      <GlassCard borderRadius={12} style={{ width: 220 }}>
        <div style={{ padding: "18px 20px", color: INK, fontWeight: 600, fontSize: 14 }}>
          Sharp-corner variant
        </div>
      </GlassCard>
    </Backdrop>
  )
}
