import type { Metadata } from "next"
import {
  LegalPage,
  LegalH2,
  LegalP,
  LegalList
} from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service | yaven",
  description: "The terms that govern your use of yaven.",
  alternates: { canonical: "/terms" }
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="8 June 2026">
      <LegalP>
        These terms govern your use of yaven, a macOS menu-bar assistant. By
        downloading, installing, or using yaven, you agree to these terms. If you do
        not agree, do not use yaven.
      </LegalP>

      <LegalH2>What yaven does</LegalH2>
      <LegalP>
        yaven pulls messages and tasks that need your attention into one place, drafts
        responses using AI, and can act on your connected accounts. yaven is
        approval-first: it does not send, delete, or change anything outside your Mac
        on its own. Outward-facing actions happen only after you explicitly approve
        them.
      </LegalP>

      <LegalH2>Your account and connected services</LegalH2>
      <LegalP>
        You are responsible for the accounts you connect to yaven (such as Gmail or
        Google Calendar) and for keeping your device secure. By connecting a service,
        you authorize yaven to access and act on it on your behalf, within the scopes
        you grant and the actions you approve. You must have the right to connect each
        account and to use it in this way, and you must comply with the terms of those
        third-party services. You can disconnect a service at any time.
      </LegalP>

      <LegalH2>Acceptable use</LegalH2>
      <LegalP>You agree not to use yaven to:</LegalP>
      <LegalList
        items={[
          "Break the law or infringe anyone's rights.",
          "Send spam, harass, deceive, or impersonate others.",
          "Access accounts or data you are not authorized to use.",
          "Reverse-engineer, resell, or abuse the service or its providers, or attempt to circumvent its safeguards."
        ]}
      />

      <LegalH2>AI-generated content</LegalH2>
      <LegalP>
        yaven uses AI to generate drafts and answers. AI output can be inaccurate or
        inappropriate. You are responsible for reviewing anything yaven drafts before
        you approve sending or acting on it. yaven shows you what it will do and waits
        for your approval precisely so you stay in control; the decision to send or act
        is always yours.
      </LegalP>

      <LegalH2>Privacy</LegalH2>
      <LegalP>
        Our{" "}
        <a href="/privacy" style={{ color: "var(--ink)" }}>
          Privacy Policy
        </a>{" "}
        explains how we handle your data. yaven is local-first: your content stays on
        your Mac, and is sent to our AI and integration providers only to fulfill the
        requests and actions you make.
      </LegalP>

      <LegalH2>Updates and availability</LegalH2>
      <LegalP>
        yaven updates itself over time to add features and fix issues. We may change,
        suspend, or discontinue parts of the service. We aim to keep yaven available
        and reliable but do not guarantee uninterrupted or error-free operation.
      </LegalP>

      <LegalH2>Disclaimers</LegalH2>
      <LegalP>
        yaven is provided &quot;as is&quot; and &quot;as available,&quot; without
        warranties of any kind, whether express or implied, to the maximum extent
        permitted by law. We do not warrant that yaven will meet your requirements, be
        error-free, or that AI output will be accurate or suitable for any particular
        purpose.
      </LegalP>

      <LegalH2>Limitation of liability</LegalH2>
      <LegalP>
        To the maximum extent permitted by law, yaven and its operators will not be
        liable for any indirect, incidental, special, consequential, or exemplary
        damages, or for any loss of data, profits, or goodwill, arising from your use
        of yaven. Nothing in these terms excludes liability that cannot be excluded
        under applicable law.
      </LegalP>

      <LegalH2>Termination</LegalH2>
      <LegalP>
        You may stop using yaven and delete it at any time. We may suspend or end your
        access if you breach these terms. You can erase the data yaven holds on your
        Mac via Settings → Delete all data, and revoke account access through your
        connected provider.
      </LegalP>

      <LegalH2>Changes to these terms</LegalH2>
      <LegalP>
        We may update these terms from time to time. We will post the updated version
        here and, for material changes, notify you in the app or by email. Continued
        use after a change means you accept the updated terms.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions about these terms? Email{" "}
        <a href="mailto:support@yaven.ai" style={{ color: "var(--ink)" }}>
          support@yaven.ai
        </a>
        .
      </LegalP>
    </LegalPage>
  )
}
