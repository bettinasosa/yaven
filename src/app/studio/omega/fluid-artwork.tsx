"use client"

import { useEffect, useRef } from "react"

import { artworkPalettes as colours } from "./artwork-palette"

/** Soft moving colour pools, with an elastic optical pattern for the footer. */
export function FluidArtwork({ palette = 0, interactive = false, pattern = false, reset = 0, animate = true, colors }: { palette?: number; interactive?: boolean; pattern?: boolean; reset?: number; animate?: boolean; colors?: string[] }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext("2d", { alpha: false })
    if (!el || !ctx) return
    const paletteColors = colors ?? colours[palette]
    const host = el.closest("#artwork") ?? el.parentElement?.parentElement ?? el
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    let width = 1, height = 1, frame = 0, visible = false, previous = 0, time = 0
    const pointer = { x: .5, y: .5, strength: 0, target: 0 }
    let drawing = false
    function render() {
      if (!ctx) return
      ctx.fillStyle = paletteColors[0]
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < 13; i++) {
        const phase = i * 2.399
        const x = width * (.5 + .49 * Math.sin(phase + time * (.11 + i % 3 * .025)))
        const y = height * (.5 + .49 * Math.cos(phase * 1.4 + time * .14))
        const radius = Math.max(width, height) * (.19 + .035 * Math.sin(time * .27 + phase))
        const dx = (x / width - pointer.x), dy = (y / height - pointer.y)
        const pull = Math.exp(-(dx * dx + dy * dy) * 8) * pointer.strength
        ctx.save()
        ctx.translate(x + dx * pull * 65, y + dy * pull * 65)
        ctx.rotate(phase + time * .09)
        ctx.scale(1.25 + .25 * Math.sin(time * .3 + phase), .75 + .15 * Math.cos(time * .24 + phase))
        const gradient = ctx.createRadialGradient(-radius * .12, -radius * .1, 0, 0, 0, radius)
        const colour = paletteColors[1 + i % 3]
        gradient.addColorStop(0, colour + "f2")
        gradient.addColorStop(.45, colour + "d9")
        gradient.addColorStop(.75, colour + "70")
        gradient.addColorStop(1, colour + "00")
        ctx.fillStyle = gradient
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2)
        ctx.restore()
      }
      if (pattern) {
        ctx.lineWidth = 2
        for (let col = -6; col < 100; col++) {
          ctx.beginPath()
          for (let row = 0; row <= 60; row++) {
            const y = row / 60 * height, base = col / 90 * width
            const dx = base / width - pointer.x, dy = y / height - pointer.y
            const influence = Math.exp(-(dx * dx + dy * dy) * 14)
            const warp = Math.sin(dy * 14 + time * .8) * influence * pointer.strength * width * .16
            const wave = Math.sin(y / height * 6 + col * .07 + time * .2) * width * .035
            const x = base + wave + warp
            if (row === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
          }
          ctx.strokeStyle = col % 3 === 0 ? "#ffffff99" : "#267fe54d"
          ctx.stroke()
        }
      }
    }
    function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0 }
    function wake() { if (!frame && visible && !document.hidden && !motion.matches && animate) frame = requestAnimationFrame(tick) }
    function tick(now: number) {
      frame = 0
      if (now - previous >= 1000 / 30) {
        time += previous ? Math.min((now - previous) / 1000, .07) * 3.5 : 0
        previous = now
        pointer.strength += (pointer.target - pointer.strength) * .08
        render()
      }
      wake()
    }
    function resize() {
      const rect = el!.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height))
      const resolution = Math.min(devicePixelRatio, 1.25)
      el!.width = Math.round(width * resolution); el!.height = Math.round(height * resolution)
      ctx!.setTransform(resolution, 0, 0, resolution, 0, 0)
      render()
    }
    function move(rawEvent: Event) {
      const event = rawEvent as PointerEvent
      if (!interactive || (event.pointerType !== "mouse" && !drawing)) return
      const rect = el!.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.target = drawing ? 1.8 : 1
      if (motion.matches || !animate) { pointer.strength = pointer.target; render() }
    }
    function down(rawEvent: Event) { const event = rawEvent as PointerEvent; drawing = true; el!.setPointerCapture(event.pointerId); move(event) }
    function release() { drawing = false; pointer.target = 0 }
    function key(event: KeyboardEvent) {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Enter"].includes(event.key)) return
      event.preventDefault()
      pointer.x = Math.max(0, Math.min(1, pointer.x + (event.key === "ArrowRight" ? .08 : event.key === "ArrowLeft" ? -.08 : 0)))
      pointer.y = Math.max(0, Math.min(1, pointer.y + (event.key === "ArrowDown" ? .08 : event.key === "ArrowUp" ? -.08 : 0)))
      pointer.target = pointer.strength = 1.6
      render()
    }
    function visibility() { if (document.hidden) stop(); else wake() }
    function preference() { stop(); render(); wake() }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else stop() })
    const size = new ResizeObserver(resize)
    size.observe(el); observer.observe(el)
    document.addEventListener("visibilitychange", visibility); motion.addEventListener("change", preference)
    if (interactive) {
      host.addEventListener("pointermove", move); host.addEventListener("pointerdown", down)
      host.addEventListener("pointerup", release); host.addEventListener("pointercancel", release); host.addEventListener("pointerleave", release)
      el.addEventListener("keydown", key); el.addEventListener("blur", release)
    }
    return () => {
      stop(); observer.disconnect(); size.disconnect()
      document.removeEventListener("visibilitychange", visibility); motion.removeEventListener("change", preference)
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerdown", down); host.removeEventListener("pointerup", release)
      host.removeEventListener("pointercancel", release); host.removeEventListener("pointerleave", release); el.removeEventListener("keydown", key); el.removeEventListener("blur", release)
    }
  }, [palette, interactive, pattern, reset, animate, colors])
  return <canvas ref={canvas} tabIndex={interactive && pattern ? 0 : undefined} role={interactive ? "img" : undefined} aria-label={interactive ? "Liquid pattern. Move or drag to distort. Arrow keys move the distortion; Space stirs it." : undefined} aria-hidden={!interactive || undefined} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: interactive && pattern ? "none" : "auto", cursor: interactive ? "crosshair" : undefined }} />
}
