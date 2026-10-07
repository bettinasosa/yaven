"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { FillButton } from "@/components/ui/fill-button"
import { ReadingDialog } from "@/app/studio/omega/reading-dialog"

export function AgencyApplicationButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return <>
    <FillButton primary className={className} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} icon={<ArrowUpRight size={25} aria-hidden="true" />}>Work with yaven</FillButton>
    <ReadingDialog article={open ? "application" : null} signupSource="editorial_application" onClose={() => setOpen(false)} />
  </>
}
