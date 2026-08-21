"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import { homeCopy } from "./home"
import type { SiteCopy } from "./types"
import type { VariantId } from "./variants"

/**
 * Every variant's copy, resolved on the client.
 *
 * The lookup happens here rather than in the route because `SiteCopy` contains
 * functions (see `Rich` in ./types) and functions cannot be serialised across
 * the server/client boundary. Routes hand over a `VariantId` string; this is
 * where it becomes copy.
 *
 * Variants are added to this map as their copy files land.
 */
const VARIANT_COPY: Record<VariantId, SiteCopy> = {
  home: homeCopy,
  fractionalCmo: homeCopy,
  boutiqueAgency: homeCopy,
  influencerMarketing: homeCopy
}

const CopyContext = createContext<SiteCopy>(homeCopy)

export function SiteCopyProvider({
  variant,
  children
}: {
  variant: VariantId
  children: ReactNode
}) {
  return (
    <CopyContext.Provider value={VARIANT_COPY[variant]}>
      {children}
    </CopyContext.Provider>
  )
}

/**
 * The copy for the page currently being rendered.
 *
 * Works inside portals too — React context follows the component tree, not the
 * DOM, so the waitlist modal can read this even though it renders into body.
 */
export function useCopy(): SiteCopy {
  return useContext(CopyContext)
}
