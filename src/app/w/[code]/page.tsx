"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function ReferralPage() {
  const router = useRouter()
  const params = useParams<{ code: string }>()

  useEffect(() => {
    if (params.code) {
      try {
        localStorage.setItem("yv_ref", params.code)
      } catch { /* localStorage unavailable */ }
    }
    router.replace("/")
  }, [params.code, router])

  return null
}
