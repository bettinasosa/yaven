// "Book a demo" opens the user's mail client with a pre-filled draft to support.
const DEMO_SUBJECT = "Demo request"
const DEMO_BODY = `Hi yaven team,

I'd like to book a demo of yaven.

A little about me:
- Name:
- Company / role:
- What I'm hoping yaven can help with:

Thanks!`

export const bookDemoHref = `mailto:support@yaven.ai?subject=${encodeURIComponent(
  DEMO_SUBJECT
)}&body=${encodeURIComponent(DEMO_BODY)}`
