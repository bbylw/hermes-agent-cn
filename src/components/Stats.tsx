import { delay } from "../lib/reveal";

const STATS = [
  {
    value: (
      <>
        v0.20<em>.5</em>
      </>
    ),
    label: "当前稳定版本",
  },
  {
    value: (
      <>
        <em>MIT</em> 开源
      </>
    ),
    label: "代码完全公开透明",
  },
  {
    value: (
      <>
        300<em>+</em>
      </>
    ),
    label: "前沿模型随意切换",
  },
  { value: "5 种", label: "沙箱隔离后端" },
];

const DELAYS = [undefined, ".08s", ".16s", ".24s"] as const;

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat reveal"
              style={DELAYS[i] ? delay(DELAYS[i]) : undefined}
            >
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
