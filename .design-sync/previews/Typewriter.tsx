import { Typewriter } from "yaven"

const style: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: 18,
  fontWeight: 500,
  color: "var(--ink, #07348b)",
}

// Typing is character-by-character on a timer; a static capture can only
// show a settled state, so this uses `startText` (the "already typed"
// continuation) to render the finished sentence instantly.
export function Default() {
  return <Typewriter text="" startText="Blueprint your ideal client, automatically." caret={false} style={style} />
}
