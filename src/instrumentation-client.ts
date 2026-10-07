import { initAnalytics } from "@/lib/analytics/posthog"

// Runs after the document loads but before React hydrates, so no event fired
// during the first render is lost. See node_modules/next/dist/docs/01-app/
// 03-api-reference/03-file-conventions/instrumentation-client.md.
initAnalytics()
