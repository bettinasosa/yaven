import gsap from "gsap"
import { ScrollCutReveal } from "yaven"

// The reveal is a real scroll-triggered GSAP tween (~1s+) — a static capture
// races it. Speeding up gsap's global clock (set before mount, so it applies
// before the trigger's tween is even created) makes the same real animation
// settle within a frame instead of reimplementing the end state.
gsap.globalTimeline.timeScale(1000)

export function Default() {
  return (
    <ScrollCutReveal
      style={{ fontSize: 28, fontWeight: 600, color: "var(--ink, #07348b)", maxWidth: 420 }}
    >
      Every client, every task, one calm inbox.
    </ScrollCutReveal>
  )
}
