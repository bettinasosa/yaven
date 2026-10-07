"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { FillButton } from "@/components/ui/fill-button"
import { ReadingDialog } from "./omega/reading-dialog"
import styles from "./crowd-hero-actions.module.css"

export function CrowdHeroActions({ navigation = false }: { navigation?: boolean }) {
  const [applicationOpen, setApplicationOpen] = useState(false)

  return <>
    <div className={navigation ? styles.navigation : styles.actions}>
      <FillButton primary={!navigation} className={navigation ? styles.talk : styles.start} type="button" aria-haspopup="dialog" onClick={() => setApplicationOpen(true)} icon={<ArrowUpRight size={navigation ? 16 : 22} aria-hidden="true" />}>{navigation ? "Talk to us" : "Get started"}</FillButton>
    </div>
    <ReadingDialog article={applicationOpen ? "application" : null} signupSource="studio_crowd_agency_application" onClose={() => setApplicationOpen(false)} />
  </>
}
