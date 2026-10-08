"use client"

import { useEffect, useRef, useState } from "react"
import { MeshGradient, Warp, type PaperShaderElement } from "@paper-design/shaders-react"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { FluidArtwork } from "./fluid-artwork"
import { artworkPalettes } from "./artwork-palette"
import styles from "./shader-showcase.module.css"

export type ArtworkLook = "Silk" | "Wash" | "Blobs"
const scenes: { look: ArtworkLook; palette: number; ink: string }[] = [
  { look: "Wash", palette: 0, ink: "#111" },
  { look: "Silk", palette: 2, ink: "#fff" },
  { look: "Blobs", palette: 3, ink: "#111" },
  { look: "Wash", palette: 1, ink: "#111" },
  { look: "Silk", palette: 3, ink: "#fff" },
  { look: "Blobs", palette: 2, ink: "#fff" },
]

/** Shader uniforms react to the pointer without rerendering the React tree. */
export function ArtworkSurface({ look, palette = 0, animate = true, colors, interactive = true }: { look: ArtworkLook; palette?: number; animate?: boolean; colors?: string[]; interactive?: boolean }) {
  const [running, setRunning] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const shader = useRef<PaperShaderElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const element = root.current
    if (!element) return
    let visible = false
    const update = () => setRunning(visible && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(element)
    document.addEventListener("visibilitychange", update)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update) }
  }, [])
  useEffect(() => {
    const element = root.current
    if (!element || (look !== "Silk" && look !== "Wash") || !interactive) return
    const host = element.closest("#artwork") ?? element.parentElement!
    const target = { x: 0, y: 0 }, current = { x: 0, y: 0 }
    let frame = 0
    function paint() {
      frame = 0
      if (document.hidden) return
      current.x += (target.x - current.x) * (reduced ? 1 : .1)
      current.y += (target.y - current.y) * (reduced ? 1 : .1)
      shader.current?.paperShaderMount?.setUniforms({
        u_offsetX: current.x * .12, u_offsetY: current.y * .12,
        u_rotation: current.x * 22,
        u_swirl: (look === "Silk" ? .8 : .7) + current.x * .16,
        u_distortion: (look === "Silk" ? .7 : .9) + current.y * .09,
      })
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .001) frame = requestAnimationFrame(paint)
    }
    function wake() { if (!frame) frame = requestAnimationFrame(paint) }
    function move(rawEvent: Event) {
      const event = rawEvent as PointerEvent, rect = host.getBoundingClientRect()
      target.x = (event.clientX - rect.left) / rect.width - .5
      target.y = .5 - (event.clientY - rect.top) / rect.height
      wake()
    }
    function leave() { target.x = 0; target.y = 0; wake() }
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave)
    return () => { cancelAnimationFrame(frame); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave) }
  }, [look, reduced, interactive])
  const speed = running && !reduced && animate ? .98 : 0
  const paletteColors = colors ?? artworkPalettes[palette]
  return <div ref={root} className={styles.shader} aria-hidden="true">
    {look === "Blobs" ? <FluidArtwork palette={palette} colors={colors} interactive={interactive} animate={animate} /> : look === "Silk" ?
      <Warp ref={shader} colors={paletteColors} shape="stripes" shapeScale={.35} distortion={.7} swirl={.8} swirlIterations={8} softness={.25} speed={speed} scale={.85} maxPixelCount={900000} style={{ width: "100%", height: "100%" }} /> :
      <MeshGradient ref={shader} colors={paletteColors} distortion={.9} swirl={.7} speed={speed} maxPixelCount={900000} style={{ width: "100%", height: "100%" }} />}
  </div>
}

export function ShaderShowcase() {
  const root = useRef<HTMLElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const [{ step, previous }, setSequence] = useState<{ step: number; previous: number | null }>({ step: 0, previous: null })
  const reduced = usePrefersReducedMotion()
  const automatic = !reduced
  const sequence = scenes
  const scene = reduced ? sequence[0] : sequence[step]

  useEffect(() => {
    if (!automatic || !root.current) return
    let visible = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const schedule = () => {
      timer = setTimeout(() => {
        const random = Math.random()
        setSequence(value => {
          const candidates = sequence.map((scene, index) => ({ scene, index }))
            .filter(({ scene }) => scene.look !== sequence[value.step].look)
          return { previous: value.step, step: candidates[Math.floor(random * candidates.length)].index }
        })
        schedule()
      }, 1100 + Math.random() * 700)
    }
    const update = () => {
      clearTimeout(timer)
      if (visible && !document.hidden) schedule()
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: .25 })
    observer.observe(root.current); document.addEventListener("visibilitychange", update)
    return () => { clearTimeout(timer); observer.disconnect(); document.removeEventListener("visibilitychange", update) }
  }, [automatic, sequence])

  useEffect(() => {
    const letters = word.current
    if (!automatic || previous === null) return
    if (!letters) return
    letters.dataset.scrambling = "true"
    const glyphs = ["✳", "○", "△", "⌁", "◇", "↗", "+", "×"]
    const scramble = () => {
      letters.textContent = [..."yaven"].map(letter => Math.random() < .65
        ? glyphs[Math.floor(Math.random() * glyphs.length)] : letter).join("")
      // Keep the same cap height; only compress wider symbol combinations horizontally.
      letters.style.removeProperty("transform")
      const range = document.createRange()
      range.selectNodeContents(letters)
      const textWidth = range.getBoundingClientRect().width
      const availableWidth = letters.clientWidth
      letters.style.transform = `scaleX(${Math.min(1, availableWidth / Math.max(1, textWidth))})`
    }
    scramble()
    const ticker = setInterval(() => {
      scramble()
    }, 150)
    const finish = setTimeout(() => {
      clearInterval(ticker)
      letters.textContent = "yaven"; delete letters.dataset.scrambling; letters.style.removeProperty("transform")
      setSequence(value => ({ ...value, previous: null }))
    }, 400 + Math.random() * 200)
    return () => { clearInterval(ticker); clearTimeout(finish); letters.textContent = "yaven"; delete letters.dataset.scrambling; letters.style.removeProperty("transform") }
  }, [step, automatic, previous])

  return <section ref={root} id="artwork" className={styles.brandPanel} aria-label="Animated yaven artwork" data-shader={scene.look}>
    {automatic && previous !== null && <ArtworkSurface look={sequence[previous].look} palette={sequence[previous].palette} />}
    <div key={reduced ? "still" : step} className={styles.sequenceLayer}>
      <ArtworkSurface look={scene.look} palette={scene.palette} />
    </div>
    <div ref={word} className={styles.panelWord} style={{ color: scene.ink }} aria-hidden="true">yaven</div>
  </section>
}
