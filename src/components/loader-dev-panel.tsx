"use client"

import { useState } from "react"
import { PageLoader } from "./page-loader"

export function LoaderDevPanel() {
  const [playing, setPlaying] = useState(true)

  if (!playing) return null

  return <PageLoader onDone={() => setPlaying(false)} />
}
