"use client"

import { useEffect, useRef } from "react"

// Original animation using the Open Peeps illustration sheet.
const spriteColumns = 15
const spriteRows = 7
const sample = (index: number, salt: number) => {
  const value = Math.sin(index * 17.31 + salt * 43.17) * 43758.5453
  return value - Math.floor(value)
}

export function CrowdWalk({ className }: { className: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext("2d")
    if (!element || !context) return

    const image = new Image()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0
    let height = 0
    let pixelRatio = 1
    let loaded = false
    let visible = false
    let disposed = false
    let frame = 0
    let elapsed = 0
    let previousTime = 0

    function draw() {
      if (!loaded || !width || !height) return
      context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context!.clearRect(0, 0, width, height)
      const personWidth = width < 600 ? 96 : 128
      const cellWidth = image.naturalWidth / spriteColumns
      const cellHeight = image.naturalHeight / spriteRows
      const personHeight = personWidth * cellHeight / cellWidth
      const speed = Math.max(32, width / 32)
      const spacing = personWidth * 1.2
      const interval = spacing / speed
      const crossingTime = (width + personWidth) / (speed * .82)
      // A shared clock starts fast and gently settles. Arrivals follow the
      // same clock, so the entrance never leaves the edges without new people.
      const sceneTime = reduced.matches ? crossingTime + interval
        : elapsed + 11.7 * (1 - Math.exp(-elapsed / 2.6))

      // Three rows give the crowd depth; draw the nearest people last.
      for (let row = 0; row < 3; row++) {
        for (const direction of [1, -1]) {
          // Each lane keeps sending new people from its edge, with staggered
          // arrivals and an individual walking speed for every person.
          const delay = (row / 3 + (direction < 0 ? .17 : 0)) * interval
          const newest = Math.floor((sceneTime - delay) / interval)
          const oldest = Math.max(0, Math.ceil((sceneTime - delay - crossingTime) / interval))
          for (let arrival = oldest; arrival <= newest; arrival++) {
            const index = arrival * 6 + row * 2 + (direction < 0 ? 1 : 0)
            const personSpeed = speed * (.82 + sample(index, 1) * .36)
            const progress = (sceneTime - delay - arrival * interval) * personSpeed
            if (progress > width + personWidth) continue
            const x = direction === 1 ? progress - personWidth : width - progress
            const bottom = height + 34 - (2 - row) * 26 - sample(index, 3) * 16
            const bounce = reduced.matches ? 0 : Math.sin(elapsed * (6 + sample(index, 5) * 3) + index) * 3
            const sprite = (index * 37 + 11) % (spriteColumns * spriteRows)
            context!.save()
            context!.translate(x + (direction < 0 ? personWidth : 0), bottom - personHeight + bounce)
            context!.scale(direction, 1)
            context!.drawImage(image, (sprite % spriteColumns) * cellWidth, Math.floor(sprite / spriteColumns) * cellHeight, cellWidth, cellHeight, 0, 0, personWidth, personHeight)
            context!.restore()
          }
        }
      }
    }

    function tick(time: number) {
      elapsed += previousTime ? Math.min((time - previousTime) / 1000, .05) : 0
      previousTime = time
      draw()
      frame = requestAnimationFrame(tick)
    }

    function updatePlayback() {
      cancelAnimationFrame(frame)
      previousTime = 0
      if (loaded && visible && !document.hidden && !reduced.matches && !disposed) frame = requestAnimationFrame(tick)
      draw()
    }

    function resize() {
      width = element!.clientWidth
      height = element!.clientHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      element!.width = Math.round(width * pixelRatio)
      element!.height = Math.round(height * pixelRatio)
      draw()
    }

    const sizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updatePlayback()
    })
    sizeObserver.observe(element)
    visibilityObserver.observe(element)
    document.addEventListener("visibilitychange", updatePlayback)
    reduced.addEventListener("change", updatePlayback)
    image.onload = () => {
      if (disposed) return
      loaded = true
      resize()
      updatePlayback()
    }
    image.src = "/artwork/open-peeps-crowd.png"

    return () => {
      disposed = true
      image.onload = null
      cancelAnimationFrame(frame)
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener("visibilitychange", updatePlayback)
      reduced.removeEventListener("change", updatePlayback)
    }
  }, [])

  return <canvas ref={canvas} className={className} aria-hidden="true" />
}
