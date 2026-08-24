import { useEffect, useRef, useState } from "react";

type Os = "unix" | "win";

const CODE_UNIX = "https://hermes-agent.nousresearch.com/install.sh";
const CODE_WIN = "https://hermes-agent.nousresearch.com/install.ps1";

function CopyIcon() {
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function InstallSection() {
  const [os, setOs] = useState<Os>("unix");
  const [copied, setCopied] = useState(false);
  const unixRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const revertTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(revertTimer.current), []);

  const onCopy = () => {
    const active = os === "win" ? winRef.current : unixRef.current;
    if (!active) return;
    // Same prompt/backslash stripping as the vanilla page.
    const text = active
      .textContent!.replace(/^[$\sPS>&]+/, "")
      .replace(/\\\s*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const done = () => {
      setCopied(true);
      window.clearTimeout(revertTimer.current);
      revertTimer.current = window.setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      done();
    }
  };

  return (
    <section className="install" id="install">
      <div className="wrap">
        <div className="install-panel reveal">
          <div className="install-left">
            <div className="sec-label">02 — 快速开始</div>
            <h3>
              一条命令，
              <br />
              装进你的<em>终端</em>
            </h3>
            <p>无需配置环境，脚本自动检测系统并完成全部依赖安装。桌面版与 CLI 共享同一份记忆。</p>
            <div className="install-steps">
              <div className="step">
                <b>01</b>复制命令并在终端中运行
              </div>
              <div className="step">
                <b>02</b>等待自动安装（约 1–2 分钟）
              </div>
              <div className="step">
                <b>03</b>运行{" "}
                <span style={{ fontFamily: "var(--mono)", color: "var(--text)" }}>hermes</span>{" "}
                开始对话
              </div>
            </div>
          </div>
          <div className="install-right">
            <div className="os-tabs" role="tablist" aria-label="选择操作系统">
              <button
                type="button"
                className={os === "unix" ? "os-tab active" : "os-tab"}
                role="tab"
                aria-selected={os === "unix"}
                onClick={() => setOs("unix")}
              >
                macOS / Linux
              </button>
              <button
                type="button"
                className={os === "win" ? "os-tab active" : "os-tab"}
                role="tab"
                aria-selected={os === "win"}
                onClick={() => setOs("win")}
              >
                Windows
              </button>
            </div>
            <div className="codebox">
              <button
                type="button"
                id="copyBtn"
                className={copied ? "copy-btn done" : "copy-btn"}
                onClick={onCopy}
                aria-label="复制安装命令"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "已复制" : "复制"}</span>
              </button>
              <div id="codeUnix" ref={unixRef} hidden={os !== "unix"}>
                <span className="c-dim">$</span> curl -fsSL \<br />
                &nbsp;&nbsp;<span className="c-amber">{CODE_UNIX}</span> \<br />
                &nbsp;&nbsp;| bash
              </div>
              <div id="codeWin" ref={winRef} hidden={os !== "win"}>
                <span className="c-dim">PS&gt;</span> irm \<br />
                &nbsp;&nbsp;<span className="c-amber">{CODE_WIN}</span> \<br />
                &nbsp;&nbsp;| iex
              </div>
            </div>
            <div className="codebox" style={{ borderStyle: "dashed" }}>
              <span className="c-dim"># 验证安装</span>
              <br />
              <span className="c-dim">$</span> hermes --version
              <br />
              <span style={{ color: "var(--green)" }}>Hermes Agent v0.20.5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
