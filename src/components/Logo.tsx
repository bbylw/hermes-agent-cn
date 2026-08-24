export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="32"
        height="32"
        rx="9"
        stroke="rgba(242,163,60,.5)"
        strokeWidth="1.5"
      />
      <path
        d="M9 21c3-1 4-3.5 4-6 2.5 0 5-1 6-4 1.5 2 4 3 6 3"
        stroke="#f2a33c"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="17" cy="23" r="2" fill="#f2a33c" />
    </svg>
  );
}

/** The "HERMES·AGENT / 赫尔墨斯智能体" wordmark next to the logo glyph. */
export function LogoBlock() {
  return (
    <span>
      <span className="logo-name">
        HERMES<em>·</em>AGENT
      </span>
      <br />
      <span className="logo-sub">赫尔墨斯智能体</span>
    </span>
  );
}
