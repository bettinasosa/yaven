"use client"

import { useEffect, useRef } from "react"

type Props = {
  src: string
  playbackRate?: number
  flipX?: boolean
}

export function HeroRefractionVideo({
  src,
  playbackRate = 0.75,
  flipX = false
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const apply = () => {
      video.defaultPlaybackRate = playbackRate
      video.playbackRate = playbackRate
    }
    apply()
    video.addEventListener("loadedmetadata", apply)
    return () => video.removeEventListener("loadedmetadata", apply)
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{
        objectPosition: "center 100%",
        transform: flipX ? "scaleX(-1) translateY(20%)" : "translateY(20%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 90%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 90%)"
      }}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
