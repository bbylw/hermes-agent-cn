interface Tier {
  name: string;
  desc: string;
  hot?: boolean;
}

const TIERS: Tier[] = [
  { name: "FREE", desc: "免费入门 · 社区支持 · 基础模型额度" },
  { name: "PLUS", desc: "更高积分额度 · 适合个人日常使用", hot: true },
  { name: "SUPER", desc: "大额积分 · 重度自动化与多智能体场景" },
  { name: "ULTRA", desc: "顶配额度 · 团队协作与高强度任务流水线" },
];

export default function Portal() {
  return (
    <section className="portal" id="portal">
      <div className="wrap">
        <div className="portal-panel reveal">
          <div className="portal-left">
            <div className="sec-label">04 — Nous 门户</div>
            <h3>
              一次订阅，
              <br />
              <em>全部能力</em>
            </h3>
            <p>
              所有付费方案均包含每月积分，可在 Hermes Agent 中直接使用，畅享 300+
              前沿模型与内置工具调用。
            </p>
            <a
              className="btn btn-primary"
              href="https://portal.nousresearch.com/manage-subscription"
              target="_blank"
              rel="noopener"
            >
              查看全部订阅方案
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className="portal-right">
            {TIERS.map((tier) => (
              <div key={tier.name} className={tier.hot ? "tier hot" : "tier"}>
                <span className="tier-name">{tier.name}</span>
                <span className="tier-desc">{tier.desc}</span>
                {tier.hot && <span className="tier-badge">最受欢迎</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
