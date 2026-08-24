import type { ReactNode } from "react";

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

function TerminalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

interface Descent {
  icon: ReactNode;
  name: string;
  req: string;
  note: string;
  buttonLabel: string;
  target: string;
  download?: boolean;
}

const DESKTOP_APPS: Descent[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3-.85 1-2.25 1.77-3.4 1.68-.14-1.1.42-2.28 1.1-3.03.78-.86 2.13-1.52 3.42-1.65zM20.94 17.1c-.57 1.3-.85 1.88-1.58 3.03-1.02 1.6-2.46 3.6-4.25 3.6-1.59.02-2-.99-4.16-.98-2.16.01-2.61 1-4.2.99-1.79-.02-3.16-1.82-4.18-3.42C.14 16.6-.14 11.5 1.55 8.79c1.19-1.9 3.07-3.01 4.83-3.01 1.8 0 2.93 1 4.42 1 1.45 0 2.33-1 4.41-1 1.57 0 3.24.86 4.42 2.34-3.89 2.13-3.26 7.69 1.31 8.98z" />
      </svg>
    ),
    name: "macOS",
    req: "macOS 12+ · Apple Silicon / Intel",
    note: "通用二进制 · 已签名公证",
    buttonLabel: "下载 .dmg",
    target: "https://hermes-assets.nousresearch.com/Hermes-Setup.dmg",
    download: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 5.55 10.6 4.5v7.15H3V5.55zm0 12.9 7.6 1.05v-7.05H3v6zm8.4 1.15L21.5 20.8V12.4h-10.1v7.2zm0-15.2v7.25h10.1V3.2l-10.1 1.2z" />
      </svg>
    ),
    name: "Windows",
    req: "Windows 10 / 11 · x64",
    note: "安装向导 · 开机自启可选",
    buttonLabel: "下载 .exe",
    target: "https://hermes-assets.nousresearch.com/Hermes-Setup.exe",
    download: true,
  },
  {
    icon: <TerminalIcon />,
    name: "Linux",
    req: "任意发行版 · 终端安装",
    note: "一行命令 · 自动识别包管理器",
    buttonLabel: "终端安装",
    target: "#install",
  },
];

export default function DownloadSection() {
  return (
    <section className="download" id="download">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">03 — 桌面端</div>
            <h2 className="sec-title">原生应用，三端齐发</h2>
          </div>
          <p className="sec-desc">为三大平台精心打造的原生桌面体验，与终端版本共享记忆与配置。</p>
        </div>
        <div className="dl-list reveal">
          {DESKTOP_APPS.map((app) => (
            <div key={app.name} className="dl-row">
              <div className="dl-icon">{app.icon}</div>
              <div>
                <div className="dl-name">{app.name}</div>
                <div className="dl-req">{app.req}</div>
              </div>
              <div className="dl-note">{app.note}</div>
              <a className="dl-btn" href={app.target} download={app.download ? "" : undefined}>
                <DownloadIcon />
                {app.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
