"use client"

import dynamic from "next/dynamic"

// Client wrapper so the WebGL gradient can be code-split with ssr:false — that
// option isn't allowed in the Server Component layout, so it lives here.
const LiquidGradientBg = dynamic(
  () =>
    import("@/components/effects/liquid-gradient-bg").then(
      m => m.LiquidGradientBg
    ),
  { ssr: false }
)

export function GradientBackdrop() {
  return <LiquidGradientBg />
}
