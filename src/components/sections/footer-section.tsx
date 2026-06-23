"use client"

import Image from "next/image"
import { WaitlistInline } from "@/components/waitlist-inline"

const colLinkStyle: React.CSSProperties = {
  color: "var(--cream)",
  fontSize: "15px",
  fontWeight: 500,
  opacity: 0.7,
  textDecoration: "none",
  transition: "opacity 0.15s ease",
  // inline-block + fit-content so the hover underline only spans the text,
  // not the full (stretched) flex-column width.
  display: "inline-block",
  width: "fit-content"
}

export function FooterSection() {
  return (
    <footer
      className="min-h-full flex flex-col"
      style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}
    >
      {/* ── Top: link columns + waitlist ── */}
      <div className="px-8 pt-20 flex flex-wrap gap-x-20 gap-y-10 shrink-0 items-start relative">
        {/* Follow column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream)",
              opacity: 0.38,
              fontWeight: 700,
              marginBottom: "14px"
            }}
          >
            Follow
          </p>
          {/* Circular icon buttons */}
          <div className="flex items-center gap-3">
            {[
              {
                label: "X",
                href: "https://x.com/yavenai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="15"
                    height="15"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/yaven/posts/?feedView=all",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16"
                    height="16"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/yavenai/?hl=en",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16"
                    height="16"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                )
              }
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center"
                style={{
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(227,213,187,0.35)",
                  borderRadius: "50%",
                  color: "var(--cream)",
                  background: "rgba(227,213,187,0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(227,213,187,0.18), 0 2px 8px rgba(0,0,0,0.18)",
                  transition:
                    "transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease",
                  flexShrink: 0
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = "translateY(-3px)"
                  el.style.background = "rgba(227,213,187,0.16)"
                  el.style.boxShadow =
                    "inset 0 1px 0 rgba(227,213,187,0.28), 0 8px 20px rgba(0,0,0,0.28)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = ""
                  el.style.background = "rgba(227,213,187,0.08)"
                  el.style.boxShadow =
                    "inset 0 1px 0 rgba(227,213,187,0.18), 0 2px 8px rgba(0,0,0,0.18)"
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream)",
              opacity: 0.38,
              fontWeight: 700,
              marginBottom: "14px"
            }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-[10px]">
            {[
              { label: "support@yaven.ai", href: "mailto:support@yaven.ai" },
              { label: "+1 (628) 338-3898", href: "tel:+16283383898" }
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="u-hover-underline"
                style={colLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
              >
                {s.label}
              </a>
            ))}
          </div>
          <address
            style={{
              ...colLinkStyle,
              marginTop: "16px",
              fontStyle: "normal",
              lineHeight: 1.5,
              cursor: "default"
            }}
          >
            169 Madison Ave STE 31950
            <br />
            New York, NY 10016
          </address>
        </div>

        {/* Legal column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream)",
              opacity: 0.38,
              fontWeight: 700,
              marginBottom: "14px"
            }}
          >
            Legal
          </p>
          <div className="flex flex-col gap-[10px]">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" }
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                className="u-hover-underline"
                style={colLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Waitlist — top right */}
        <div className="w-full sm:w-auto sm:ml-auto sm:max-w-[400px] sm:min-w-[320px]">
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream)",
              opacity: 0.38,
              fontWeight: 700,
              marginBottom: "14px"
            }}
          >
            Join the waitlist
          </p>
          <WaitlistInline />
        </div>

      </div>

      {/* ── Bottom: giant wordmark + copyright ── */}
      <div
        className="flex-1 flex items-end relative pb-2 pt-16 sm:pt-0"
        style={{ paddingLeft: "clamp(20px, 2vw, 44px)", paddingRight: "16px" }}
      >
        <span
          className="font-medium select-none"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(60px, 18vw, 340px)",
            color: "var(--cream)",
            letterSpacing: "-0.04em",
            lineHeight: 0.82
          }}
        >
          Yaven
        </span>

        <div
          style={{
            position: "absolute",
            right: "clamp(12px, 3vw, 28px)",
            bottom: "clamp(8px, 1.5vh, 16px)",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <Image
            src="/yaven-logo.webp"
            alt="Yaven"
            width={16}
            height={28}
            style={{ display: "block", width: "auto", height: "14px", opacity: 0.6 }}
          />
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "9px",
              fontWeight: 700,
              color: "var(--cream)",
              opacity: 0.3,
              letterSpacing: "0.06em",
              margin: 0
            }}
          >
            © 2026 Yaven
          </p>
        </div>
      </div>
    </footer>
  )
}
