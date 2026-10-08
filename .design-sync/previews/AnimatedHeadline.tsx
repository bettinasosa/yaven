import { useEffect } from "react"
import gsap from "gsap"
import { AnimatedHeadline } from "yaven"

// AnimatedHeadline reveals only after the site's "yaven:loader:done" window
// event fires (dispatched by the page loader) — firing it here is the real
// trigger, not a reimplementation. The reveal tween still takes ~1s, which a
// static capture races, so gsap's global clock is sped up (set before mount)
// so the same real tween settles within a frame.
gsap.globalTimeline.timeScale(1000)

function FireLoaderDone({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.dispatchEvent(new Event("yaven:loader:done"))
  }, [])
  return <>{children}</>
}

export function Default() {
  return (
    <FireLoaderDone>
      <AnimatedHeadline style={{ fontSize: 28, fontWeight: 600, color: "var(--ink, #07348b)", maxWidth: 420 }}>
        Meet Yaven, the AI that runs your client work.
      </AnimatedHeadline>
    </FireLoaderDone>
  )
}
