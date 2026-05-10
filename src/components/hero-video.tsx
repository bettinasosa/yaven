"use client"

import { useEffect, useRef } from "react"

type HeroVideoProps = {
  src: string
  playbackRate?: number
  className?: string
}

export function HeroVideo({
  src,
  playbackRate = 0.75,
  className
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const applyPlaybackRate = () => {
      video.defaultPlaybackRate = playbackRate
      video.playbackRate = playbackRate
    }

    applyPlaybackRate()
    video.addEventListener("loadedmetadata", applyPlaybackRate)

    return () => {
      video.removeEventListener("loadedmetadata", applyPlaybackRate)
    }
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
