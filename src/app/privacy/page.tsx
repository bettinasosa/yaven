import type { Metadata } from "next"
import {
  LegalPage,
  LegalH2,
  LegalP,
  LegalList
} from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Yaven",
  description:
    "How Yaven handles your data. Yaven is local-first: your emails, messages, and drafts stay on your Mac.",
  alternates: { canonical: "/privacy" }
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="19 August 2026">
      <LegalP>
        Yaven is a macOS menu-bar assistant that helps you triage and reply to
        messages, drafts in your voice, and acts on your connected accounts only
        when you approve. This policy explains what data Yaven processes and why.
        It covers both the Yaven app and this website, yaven.ai.
      </LegalP>

      <LegalH2>Our approach in one line</LegalH2>
      <LegalP>
        Yaven is local-first. Your emails, messages, drafts, and the profile it
        builds about you are stored on your own Mac. We do not upload them to our
        servers or sync them to a cloud.
      </LegalP>

      <LegalH2>What data we process, and why</LegalH2>
      <LegalP>
        <strong>1. Content you ask Yaven to act on</strong> — emails, messages,
        calendar events, and what is on your screen at the moment you press a Yaven
        shortcut. This is stored locally on your Mac. When you ask Yaven to draft a
        reply or answer a question, the relevant text and/or a single screenshot is
        sent for that one request to our AI provider (Anthropic) to generate the
        response, and to the relevant service through our integration provider
        (Composio) when you approve an action. iMessage is read only on your Mac and
        only ever leaves your machine as a draft you have approved.
      </LegalP>
      <LegalP>
        <strong>2. Account connections</strong> — when you link Gmail or Google
        Calendar, the connection is held by our integration provider (Composio). We
        can see <em>which</em> services you connected, never their contents.
      </LegalP>
      <LegalP>
        <strong>3. Anonymous usage analytics in the app</strong> — to improve the
        product we collect event counts (such as app opens, app version, which
        permissions you granted, and character counts) via PostHog. We never collect the content of
        your messages, emails, or drafts. You can turn analytics off at any time in
        Settings, which stops collection and clears the local analytics identity.
      </LegalP>
      <LegalP>
        <strong>4. Technical data in transit</strong> — requests to our relay carry
        an account identifier so the correct account is used. The relay stores
        nothing; it only logs errors transiently for debugging.
      </LegalP>

      <LegalH2>The Yaven website</LegalH2>
      <LegalP>
        <strong>Joining the waitlist.</strong> When you submit the form on this site
        we store your email address, and — if you fill them in — your name, your
        role, and whether you use a Mac. We also store how you arrived: the
        campaign tags (utm_*) on the link you followed, the domain that referred
        you, the page you landed on, and, if you came through a referral link, the
        code that sent you. We use this to invite you when access opens, to work out
        which channels bring people who actually want Yaven, and to credit whoever
        referred you. Your address is not sold, and we do not send a newsletter.
        This data is held in our database (Supabase) and mirrored to a private
        spreadsheet as a backup.
      </LegalP>
      <LegalP>
        <strong>Website analytics.</strong> We count how the site is used with
        PostHog: pages viewed, the campaign and referrer a visit came from, and the
        steps of the waitlist form — seen, started, submitted, succeeded, failed.
        The events record which form and which button, never what you typed. Your
        email address, your name, and any referral code are deliberately excluded
        from analytics, and referral URLs are stripped of their code before an event
        is sent.
      </LegalP>
      <LegalP>
        Website analytics are anonymous: we do not identify visitors, and we do not
        build a profile of you or combine this with the app&apos;s analytics. We set{" "}
        <strong>no cookies</strong> on this site and run no advertising or
        cross-site tracking. PostHog stores a single random device identifier in
        your browser&apos;s local storage so that a return visit is not counted as a
        new person; you can clear it at any time through your browser&apos;s site
        data settings. Automatic click recording, session replay, and heatmaps are
        all switched off. If your browser sends a Do Not Track or Global Privacy
        Control signal, we collect nothing at all.
      </LegalP>
      <LegalP>
        We rely on our legitimate interest in understanding how our own site
        performs, balanced against the minimal, non-identifying nature of what is
        collected. Waitlist details are processed to take the step you asked for —
        putting you on the list.
      </LegalP>

      <LegalH2>How Yaven uses Google user data</LegalH2>
      <LegalP>
        Yaven&apos;s use of information received from Google APIs adheres to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ink)" }}
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. When you connect a Google account,
        Yaven requests only the scopes needed to read and triage your mail, draft and
        send replies you approve, and show your calendar. Specifically:
      </LegalP>
      <LegalList
        items={[
          <>
            <strong>Gmail</strong> — to read messages for triage and summaries, and
            to create, save, and send the replies you approve.
          </>,
          <>
            <strong>Google Calendar</strong> — to show your upcoming events and your
            next-meeting countdown.
          </>,
          <>
            <strong>Basic profile (email, name)</strong> — to identify your account.
          </>
        ]}
      />
      <LegalP>
        We do <strong>not</strong> use Google user data for advertising, we do{" "}
        <strong>not</strong> sell it, and we do <strong>not</strong> use it to train
        generalized AI or machine-learning models. Google user data is used only to
        provide and improve the user-facing features above, and is transferred to
        others only as needed to provide those features (our AI and integration
        providers, listed below) or with your consent.
      </LegalP>

      <LegalH2>Permissions Yaven asks macOS for</LegalH2>
      <LegalList
        items={[
          <>
            <strong>Accessibility</strong> — to deliver the global shortcuts and type
            drafts into your reply boxes.
          </>,
          <>
            <strong>Screen Recording</strong> — so the draft and ask features can see
            what is on screen at the moment you press the shortcut. Yaven does not
            watch or record your screen in the background.
          </>,
          <>
            <strong>Full Disk Access</strong> — only if you connect iMessage, to read
            your local Messages database on your Mac.
          </>,
          <>
            <strong>Notifications</strong> — for approval and completion alerts.
          </>
        ]}
      />

      <LegalH2>Who we share data with</LegalH2>
      <LegalP>
        We use a small number of processors, each handling data only for the purpose
        listed:
      </LegalP>
      <LegalList
        items={[
          <>
            <strong>Anthropic</strong> — generates drafts and answers. Inputs are not
            used to train models.
          </>,
          <>
            <strong>Composio</strong> — brokers your account connections and relays
            approved API calls.
          </>,
          <>
            <strong>Cloudflare</strong> — hosts our stateless relay, which holds no
            API keys in the app and stores no request content.
          </>,
          <>
            <strong>PostHog</strong> — anonymous analytics for the app (only if you
            have not disabled it) and for this website.
          </>,
          <>
            <strong>Supabase</strong> — hosts the waitlist database holding the
            details you submit on this site.
          </>
        ]}
      />
      <LegalP>
        We do not sell your personal data, and we do not use your messages to train AI
        models. Our processors are based in the United States; where personal data is
        transferred outside the UK/EEA, the transfer is covered by each
        provider&apos;s data processing agreement and Standard Contractual Clauses (or
        equivalent).
      </LegalP>

      <LegalH2>How long we keep data</LegalH2>
      <LegalP>
        Content and the context profile are stored on your Mac for as long as you keep
        Yaven installed; removing the app removes the local data. Analytics events, if
        enabled, are retained by PostHog for the period set in our analytics
        configuration. Relay logs are transient. Waitlist details are kept until you
        ask us to remove them, or until we close the waitlist and have finished
        inviting everyone on it.
      </LegalP>

      <LegalH2>Your choices and rights</LegalH2>
      <LegalP>
        Because most of your data lives on your own device, you can delete it
        directly: Settings → Delete all data erases everything Yaven stored on your
        Mac and signs you out. To revoke Yaven&apos;s access to your Google account at
        any time, visit your{" "}
        <a
          href="https://myaccount.google.com/permissions"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ink)" }}
        >
          Google Account permissions
        </a>
        . Depending on where you live, you may have rights to access, correct, delete,
        restrict, port, or object to the processing of your personal data. To exercise
        any right that involves data held by our processors, contact us at the address
        below and we will respond within one month. To be removed from the waitlist,
        email us and we will delete your entry.
      </LegalP>

      <LegalH2>Children</LegalH2>
      <LegalP>Yaven is not intended for anyone under 16.</LegalP>

      <LegalH2>Changes</LegalH2>
      <LegalP>
        We will post changes here and, for material changes, notify you in the app or
        by email.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions about this policy or your data? Email{" "}
        <a href="mailto:support@yaven.ai" style={{ color: "var(--ink)" }}>
          support@yaven.ai
        </a>
        .
      </LegalP>
    </LegalPage>
  )
}
