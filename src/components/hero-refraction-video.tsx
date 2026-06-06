"use client"

import NextImage from "next/image"
import { useEffect, useRef, useSyncExternalStore } from "react"

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia("(min-width: 768px)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

type Props = {
  src: string
  staticSrc: string
  playbackRate?: number
  flipX?: boolean
}

export function HeroRefractionVideo({
  src,
  staticSrc,
  playbackRate = 0.75,
  flipX = false
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // false on the server — video element never SSR'd, avoids iOS Safari play button
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  )

  useEffect(() => {
    if (!isDesktop) return
    const video = videoRef.current
    if (!video) return
    const apply = () => {
      video.defaultPlaybackRate = playbackRate
      video.playbackRate = playbackRate
    }
    apply()
    video.addEventListener("loadedmetadata", apply)
    video.play().catch(() => {})
    return () => video.removeEventListener("loadedmetadata", apply)
  }, [isDesktop, playbackRate])

  const sharedStyle = {
    objectPosition: "center 100%",
    transform: flipX ? "scaleX(-1) translateY(20%)" : "translateY(20%)",
    maskImage:
      "linear-gradient(to bottom, black 0%, black 65%, transparent 90%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, black 0%, black 65%, transparent 90%)"
  }

  return (
    <>
      {/* Always rendered on mobile — static image, no video element in DOM */}
      {!isDesktop && (
        <NextImage
          src={staticSrc}
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover z-0"
          style={sharedStyle}
        />
      )}
      {/* Video only mounted in DOM on desktop — eliminates iOS Safari play button */}
      {isDesktop && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={sharedStyle}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  )
}
