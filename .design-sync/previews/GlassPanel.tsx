import { GlassPanel } from "yaven"

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--primary, #267fe5)", padding: 40, display: "flex", gap: 20 }}>
      {children}
    </div>
  )
}

export function Default() {
  return (
    <Backdrop>
      <GlassPanel>
        <span>Get Yaven</span>
      </GlassPanel>
    </Backdrop>
  )
}

export function AsButton() {
  return (
    <Backdrop>
      <GlassPanel as="button" onClick={() => {}}>
        <span>Join waitlist</span>
      </GlassPanel>
    </Backdrop>
  )
}
