"use client"

import { useEffect, useRef } from "react"

// x_{t+1} = sin(x²−y²+a),  y_{t+1} = cos(2xy+b)
export function HeroAttractor({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let raf = 0
    let running = true

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const scale = Math.min(W, H) * 0.46
    const cx    = W * 0.5
    const cy    = H * 0.5

    let a = 2.7, b = 4.86
    let ta = 2.7, tb = 4.86
    let x = 0.5, y = 0.5
    let frameCount = 0

    // Settle onto the attractor
    for (let i = 0; i < 2000; i++) {
      const nx = Math.sin(x * x - y * y + a)
      const ny = Math.cos(2 * x * y + b)
      x = nx; y = ny
    }

    // ── Phase 1: density-map warmup ────────────────────────────────────
    // Count orbit hits per pixel → single putImageData → instantly visible.
    // Avoids the ctx.fill() batching bug where pixels hit multiple times
    // in one path only get alpha applied once.
    const density = new Uint32Array(W * H)
    let maxD = 0

    for (let i = 0; i < 2_000_000; i++) {
      const nx = Math.sin(x * x - y * y + a)
      const ny = Math.cos(2 * x * y + b)
      x = nx; y = ny
      const px = Math.round(cx + x * scale)
      const py = Math.round(cy + y * scale)
      if (px >= 0 && px < W && py >= 0 && py < H) {
        const v = ++density[py * W + px]
        if (v > maxD) maxD = v
      }
    }

    const img  = ctx.createImageData(W, H)
    const pix  = img.data
    const logMax = Math.log(maxD + 1)

    for (let i = 0; i < W * H; i++) {
      // Power curve: ^0.55 brightens mid-tones so the attractor reads as
      // cloud-like wisps rather than a solid dark blob
      const t = density[i] > 0
        ? Math.pow(Math.log(density[i] + 1) / logMax, 0.55)
        : 0
      pix[i * 4]     = Math.round(245 - t * (245 -  20))
      pix[i * 4 + 1] = Math.round(240 - t * (240 -  85))
      pix[i * 4 + 2] = Math.round(232 - t * (232 - 195))
      pix[i * 4 + 3] = 255
    }

    ctx.putImageData(img, 0, 0)

    // ── Phase 2: animation pre-run ─────────────────────────────────────
    // Run 150 frames of the animation loop synchronously so the dot layer
    // is fully built before the first RAF tick — no "building from scratch"
    // visible to the user.
    ctx.fillStyle = "rgba(20,85,195,0.06)"
    for (let f = 0; f < 150; f++) {
      for (let i = 0; i < 15_000; i++) {
        const nx = Math.sin(x * x - y * y + a)
        const ny = Math.cos(2 * x * y + b)
        x = nx; y = ny
        ctx.fillRect(
          Math.round(cx + x * scale),
          Math.round(cy + y * scale),
          2, 2
        )
      }
    }

    // ── Phase 3: live animation ────────────────────────────────────────
    const PRESETS: [number, number][] = [
      [2.7,   4.86 ],
      [2.7,   4.86 ],
      [3.587, 4.246],
      [3.682, 4.155],
      [2.4,   5.1  ],
    ]

    const tick = () => {
      if (!running) return

      a += (ta - a) * 0.002
      b += (tb - b) * 0.002
      frameCount++
      if (frameCount % 600 === 0) {
        const [na, nb] = PRESETS[Math.floor(Math.random() * PRESETS.length)]
        ta = na; tb = nb
      }

      // Slow cream fade — full dissolve takes ~40 s
      ctx.fillStyle = "rgba(245,240,232,0.002)"
      ctx.fillRect(0, 0, W, H)

      // Add new points — individual fillRect so alpha compounds per-pixel
      ctx.fillStyle = "rgba(20,85,195,0.06)"
      for (let i = 0; i < 15_000; i++) {
        const nx = Math.sin(x * x - y * y + a)
        const ny = Math.cos(2 * x * y + b)
        x = nx; y = ny
        ctx.fillRect(
          Math.round(cx + x * scale),
          Math.round(cy + y * scale),
          2, 2
        )
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [])

  // Mask on wrapper div only — no filter on canvas.
  // blur + mask on same element = invisible in Safari (WebKit compositing bug).
  return (
    <div
      className={className ?? "absolute inset-0 w-full h-full z-0"}
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 58%, transparent 86%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 58%, transparent 86%)"
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
