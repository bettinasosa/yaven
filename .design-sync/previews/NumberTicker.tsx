import { NumberTicker } from "yaven"

const style: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: 40,
  fontWeight: 600,
  color: "var(--ink, #07348b)",
}

// duration=1 settles the count-up on the next frame so a static capture
// always lands on the final target instead of a mid-animation value.
export function Default() {
  return <NumberTicker target={248} suffix=" proposals" duration={1} style={style} />
}

export function WithPrefix() {
  return <NumberTicker target={14} prefix="Day " duration={1} style={style} />
}
