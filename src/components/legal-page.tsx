import Link from "next/link"
import { FooterSection } from "@/components/sections/footer-section"

/**
 * Shared shell for the Privacy Policy and Terms of Service pages. Clean, readable
 * typography on a light surface (legal copy should be high-contrast), with the brand
 * ink-blue for headings and links and the site footer underneath for consistency.
 */
export function LegalPage({
  title,
  lastUpdated,
  children
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[820px] flex-1 px-4 py-16 sm:px-6 sm:py-24">
        {/* Frosted panel keeps the dense legal copy high-contrast while the
            site's living gradient glows through the margins behind it. */}
        <div
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "28px",
            padding: "clamp(28px, 5vw, 64px)",
            boxShadow: "0 24px 70px rgba(10,14,26,0.22)"
          }}
        >
        {/* Back to home */}
        <Link
          href="/"
          className="u-hover-underline inline-block"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.04em",
            color: "var(--ink)",
            opacity: 0.7,
            textDecoration: "none",
            marginBottom: "48px"
          }}
        >
          ← Yaven
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(40px, 8vw, 64px)",
            color: "var(--ink)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "16px"
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#6b6b6b",
            marginBottom: "56px"
          }}
        >
          Last updated: {lastUpdated}
        </p>

        <div className="legal-prose">{children}</div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}

/** Section heading inside a legal page. */
export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontSize: "26px",
        color: "var(--ink)",
        letterSpacing: "-0.01em",
        marginTop: "44px",
        marginBottom: "14px"
      }}
    >
      {children}
    </h2>
  )
}

/** Body paragraph. */
export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "16px",
        lineHeight: 1.7,
        color: "#2a2a2a",
        marginBottom: "16px"
      }}
    >
      {children}
    </p>
  )
}

/** Bulleted list. */
export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul
      style={{
        listStyle: "disc",
        paddingLeft: "22px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{ fontSize: "16px", lineHeight: 1.6, color: "#2a2a2a" }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
