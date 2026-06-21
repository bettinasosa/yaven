// "Book a demo" opens the user's mail client with a pre-filled draft to support.
const DEMO_SUBJECT = "Demo request"
const DEMO_BODY = `Hi Yaven team,

I'd like to book a demo of Yaven.

A little about me:
- Name:
- Company / role:
- What I'm hoping Yaven can help with:

Thanks!`

export const bookDemoHref = `mailto:support@yaven.us?subject=${encodeURIComponent(
  DEMO_SUBJECT
)}&body=${encodeURIComponent(DEMO_BODY)}`
