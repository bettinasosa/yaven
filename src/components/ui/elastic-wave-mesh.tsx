"use client"

import { useEffect, useRef } from "react"

type Point = { x: number; y: number; dx: number; dy: number; vx: number; vy: number }

/** A live spring mesh, not a video or pointer-following image. */
export function ElasticWaveMesh({ paused = false, reset = 0, describedBy, interactive = true }: { paused?: boolean; reset?: number; describedBy?: string; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(paused)
  const controls = useRef({ sync: () => {}, reset: () => {} })
  useEffect(() => { pausedRef.current = paused; controls.current.sync() }, [paused])
  useEffect(() => { controls.current.reset() }, [reset])

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0, height = 0, ratio = 1, lines: Point[][] = []
    let frame = 0, last = 0, time = 0, visible = false, energy = 0
    const pointer = { x: 0, y: 0, originX: 0, originY: 0, vx: 0, vy: 0, active: false, down: false }
    const canRun = () => visible && !document.hidden
    const ambient = () => !pausedRef.current && !motion.matches

    function render(now: number) {
      frame = 0
      const delta = last ? Math.min((now - last) / 16.67, 2) : 1
      last = now
      if (ambient()) time += delta * .012
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx!.fillStyle = "#080808"; ctx!.fillRect(0, 0, width, height)
      ctx!.strokeStyle = "rgba(255,255,255,.72)"; ctx!.lineWidth = 1.6
      energy = 0
      for (const line of lines) {
        ctx!.beginPath()
        for (let i = 0; i < line.length; i++) {
          const point = line[i]
          const baseX = point.x + 44 * Math.sin(point.y * .009 + 2.4 * Math.sin(point.x * .006 + time * .12) + time * .23)
            + 24 * Math.sin(point.y * .016 - point.x * .006 - time * .19)
          const baseY = point.y + 9 * Math.sin(point.x * .009 + point.y * .004 + time * .15)
          const fieldX = pointer.down ? pointer.originX : pointer.x, fieldY = pointer.down ? pointer.originY : pointer.y
          const distance = (baseX - fieldX) ** 2 + (baseY - fieldY) ** 2
          const influence = pointer.active ? Math.exp(-distance / 28000) : 0
          const targetX = influence * (pointer.down ? (pointer.x - pointer.originX) * .85 : (baseX - pointer.x) * .26 + pointer.vx * 2.5)
          const targetY = influence * (pointer.down ? (pointer.y - pointer.originY) * .85 : (baseY - pointer.y) * .15 + pointer.vy * 2)
          if (motion.matches) { point.dx = targetX; point.dy = targetY }
          else {
            point.vx = (point.vx + (targetX - point.dx) * .065 * delta) * .84
            point.vy = (point.vy + (targetY - point.dy) * .065 * delta) * .84
            point.dx += point.vx * delta; point.dy += point.vy * delta
          }
          energy = Math.max(energy, Math.abs(point.vx) + Math.abs(point.vy))
          const x = baseX + point.dx, y = baseY + point.dy
          if (i === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }
      pointer.vx *= .8; pointer.vy *= .8
      if (canRun() && (ambient() || (!motion.matches && energy > .04))) frame = requestAnimationFrame(render)
    }
    function sync() { cancelAnimationFrame(frame); last = 0; frame = requestAnimationFrame(render) }
    function clear() {
      pointer.active = false; pointer.down = false; pointer.vx = 0; pointer.vy = 0
      for (const line of lines) for (const point of line) { point.dx = 0; point.dy = 0; point.vx = 0; point.vy = 0 }
      sync()
    }
    function resize() {
      const bounds = canvas!.getBoundingClientRect(); width = bounds.width; height = bounds.height
      ratio = Math.min(devicePixelRatio, 1.5)
      canvas!.width = Math.round(width * ratio); canvas!.height = Math.round(height * ratio)
      lines = []
      for (let x = -90; x <= width + 90; x += 13) {
        const line: Point[] = []
        for (let y = -35; y <= height + 45; y += 16) line.push({ x, y, dx: 0, dy: 0, vx: 0, vy: 0 })
        lines.push(line)
      }
      sync()
    }
    function move(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect()
      const x = event.clientX - bounds.left, y = event.clientY - bounds.top
      pointer.vx = pointer.active ? Math.max(-30, Math.min(30, x - pointer.x)) : 0
      pointer.vy = pointer.active ? Math.max(-30, Math.min(30, y - pointer.y)) : 0
      pointer.x = x; pointer.y = y; pointer.active = true
      if (!frame) sync()
    }
    function down(event: PointerEvent) {
      move(event); pointer.down = true; pointer.originX = pointer.x; pointer.originY = pointer.y
      canvas!.setPointerCapture(event.pointerId)
    }
    function release(event: PointerEvent) {
      pointer.down = false; pointer.active = false
      if (canvas!.hasPointerCapture(event.pointerId)) canvas!.releasePointerCapture(event.pointerId)
      sync()
    }
    function leave() { if (!pointer.down) { pointer.active = false; sync() } }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); clear(); return }
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return
      event.preventDefault()
      if (!pointer.active) { pointer.x = width / 2; pointer.y = height / 2; pointer.originX = pointer.x; pointer.originY = pointer.y }
      pointer.active = true; pointer.down = true
      pointer.x += event.key === "ArrowRight" ? 45 : event.key === "ArrowLeft" ? -45 : 0
      pointer.y += event.key === "ArrowDown" ? 45 : event.key === "ArrowUp" ? -45 : 0
      sync()
    }
    controls.current = { sync, reset: clear }
    const resizeObserver = new ResizeObserver(resize)
    const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync() })
    resizeObserver.observe(canvas); visibility.observe(canvas)
    document.addEventListener("visibilitychange", sync); motion.addEventListener("change", clear)
    if (interactive) {
      canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerdown", down)
      canvas.addEventListener("pointerup", release); canvas.addEventListener("pointercancel", release)
      canvas.addEventListener("pointerleave", leave); canvas.addEventListener("keydown", key); canvas.addEventListener("blur", clear)
    }
    resize()
    return () => {
      controls.current = { sync: () => {}, reset: () => {} }; cancelAnimationFrame(frame)
      resizeObserver.disconnect(); visibility.disconnect(); document.removeEventListener("visibilitychange", sync); motion.removeEventListener("change", clear)
      canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerdown", down)
      canvas.removeEventListener("pointerup", release); canvas.removeEventListener("pointercancel", release)
      canvas.removeEventListener("pointerleave", leave); canvas.removeEventListener("keydown", key); canvas.removeEventListener("blur", clear)
    }
  }, [interactive])
  return <canvas ref={canvasRef} tabIndex={interactive ? 0 : undefined} role={interactive ? "img" : undefined} aria-label={interactive ? "Interactive spring mesh" : undefined} aria-describedby={interactive ? describedBy : undefined} aria-hidden={!interactive || undefined}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#080808", touchAction: "pan-y", cursor: interactive ? "grab" : undefined }} />
}
