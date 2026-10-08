"use client"

import { useEffect, useRef } from "react"

// Original animation using the Open Peeps illustration sheet.
const spriteColumns = 15
const spriteRows = 7
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)
const walkClock = (time: number) => time + 11.7 * (1 - Math.exp(-time / 2.6))

type Walker = {
  born: number
  direction: number
  speed: number
  size: number
  depth: number
  rhythm: number
  phase: number
  bounce: number
  sprite: number
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
    let crowdTime = 0
    let previousTime = 0
    let seeded = false
    let people: Walker[] = []
    let illustrations: number[] = []
    const nextArrivals = [0, 0]

    function nextIllustration() {
      if (!illustrations.length) {
        illustrations = Array.from({ length: spriteColumns * spriteRows }, (_, index) => index)
        for (let index = illustrations.length - 1; index > 0; index--) {
          const swap = Math.floor(Math.random() * (index + 1))
          const selected = illustrations[swap]
          illustrations[swap] = illustrations[index]
          illustrations[index] = selected
        }
      }
      return illustrations.pop()!
    }

    function draw() {
      if (!loaded || !width || !height) return
      context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context!.clearRect(0, 0, width, height)
      const personWidth = width < 600 ? 96 : 128
      const cellWidth = image.naturalWidth / spriteColumns
      const cellHeight = image.naturalHeight / spriteRows
      const speed = Math.max(32, width / 32)
      const interval = personWidth * .3 / speed
      if (!seeded) {
        nextArrivals[0] = randomBetween(0, interval * .3)
        nextArrivals[1] = randomBetween(0, interval * .3)
        seeded = true
      }
      // Reduced motion gets a filled, static crowd without an entrance.
      if (reduced.matches) crowdTime = Math.max(crowdTime, (width + personWidth * 1.18) / (speed * .72))

      // Each side has its own irregular arrival schedule. Sample each person's
      // appearance once, so their size, position and pace stay stable as they walk.
      for (let side = 0; side < 2; side++) {
        while (nextArrivals[side] <= crowdTime) {
          people.push({
            born: nextArrivals[side], direction: side === 0 ? 1 : -1,
            speed: randomBetween(.72, 1.32), size: randomBetween(.76, 1.18),
            depth: Math.random(), rhythm: randomBetween(5, 9),
            phase: randomBetween(0, Math.PI * 2), bounce: randomBetween(2, 4),
            sprite: nextIllustration(),
          })
          nextArrivals[side] += interval * randomBetween(.55, 1.45)
        }
      }
      people = people.filter(person => (crowdTime - person.born) * speed * person.speed <= width + personWidth * person.size)
      people.sort((a, b) => b.depth - a.depth)
      for (const person of people) {
        const drawWidth = personWidth * person.size
        const drawHeight = drawWidth * cellHeight / cellWidth
        const progress = (crowdTime - person.born) * speed * person.speed
        const x = person.direction === 1 ? progress - drawWidth : width - progress
        const bottom = height + 48 - person.depth * 40
        const bounce = reduced.matches ? 0 : Math.sin(elapsed * person.rhythm + person.phase) * person.bounce
        context!.save()
        context!.translate(x + (person.direction < 0 ? drawWidth : 0), bottom - drawHeight + bounce)
        context!.scale(person.direction, 1)
        context!.drawImage(image, (person.sprite % spriteColumns) * cellWidth, Math.floor(person.sprite / spriteColumns) * cellHeight, cellWidth, cellHeight, 0, 0, drawWidth, drawHeight)
        context!.restore()
      }
    }

    function tick(time: number) {
      const previousElapsed = elapsed
      elapsed += previousTime ? Math.min((time - previousTime) / 1000, .05) : 0
      crowdTime += walkClock(elapsed) - walkClock(previousElapsed)
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
