import Terminal from "./Terminal";
import { delay } from "../lib/reveal";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
      </div>
      <div className="wrap hero-inner">
        <div>
          <div className="hero-badge reveal">
            <span className="dot"></span>开源软件 · MIT 许可证
          </div>
          <h1 className="reveal" style={delay(".08s")}>
            与你<span className="hl">共同成长</span>的
            <br />
            AI 智能体
          </h1>
          <p className="hero-desc reveal" style={delay(".16s")}>
            Hermes Agent 驻留在你的设备上，连接你所有的聊天平台。
            <strong>持久记忆、自然语言自动化、子智能体委派</strong>
            ——一次部署，处处可用，越用越懂你。
          </p>
          <div className="hero-actions reveal" style={delay(".24s")}>
            <a className="btn btn-primary" href="#download">
              <DownloadIcon />
              下载桌面版
            </a>
            <a className="btn btn-ghost" href="#install">
              <ChevronIcon />
              终端安装
            </a>
          </div>
          <div className="hero-meta reveal" style={delay(".32s")}>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              本地优先 · 数据自持
            </span>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              5 分钟完成部署
            </span>
          </div>
        </div>

        <div className="reveal" style={delay(".2s")}>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
