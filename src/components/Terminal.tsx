import { useEffect, useRef } from "react";

type OutputLine = [cls: string, text: string];

interface ScriptItem {
  cmd: string;
  out: OutputLine[];
}

const SCRIPT: ScriptItem[] = [
  {
    cmd: "curl -fsSL hermes-agent.nousresearch.com/install.sh | bash",
    out: [
      ["t-ok", "✓ Hermes Agent v0.20.5 · 安装完成"],
      ["t-dim", "— 依赖就绪 · 记忆库已初始化"],
    ],
  },
  { cmd: "hermes connect telegram", out: [["t-ok", "✓ 已连接 Telegram · 记忆已同步"]] },
  {
    cmd: 'hermes schedule "每天 08:00 发送 AI 简报"',
    out: [["t-ok", "✓ 定时任务已创建 · 明早 08:00 首次执行"]],
  },
  {
    cmd: 'hermes delegate "整理本周 GitHub issues"',
    out: [
      ["t-ok", "⠿ 子智能体 ×3 已启动 · 各自独立终端"],
      ["t-dim", "— 分类 / 去重 / 摘要 流水线运行中"],
    ],
  },
];

function lineEl(cls: string, text?: string): HTMLDivElement {
  const div = document.createElement("div");
  div.className = cls ? `t-line ${cls}` : "t-line";
  if (text !== undefined) div.textContent = text;
  return div;
}

function promptLine(): HTMLDivElement {
  const row = lineEl("");
  const prompt = document.createElement("span");
  prompt.className = "t-prompt";
  prompt.textContent = "➜ ~ ";
  const cmd = document.createElement("span");
  cmd.className = "t-cmd";
  const cursor = document.createElement("span");
  cursor.className = "t-cursor";
  row.append(prompt, cmd, cursor);
  return row;
}

/**
 * Self-typing terminal demo. The animation is driven imperatively (exactly like
 * the vanilla page) so the typing cadence and DOM structure are identical; the
 * effect cleans up its timers and observer on unmount.
 */
export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let started = false;
    let cancelled = false;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    function run() {
      body.innerHTML = "";
      let i = 0;
      function nextCmd() {
        if (cancelled) return;
        if (i >= SCRIPT.length) {
          body.appendChild(promptLine());
          return;
        }
        const item = SCRIPT[i];
        const line = promptLine();
        body.appendChild(line);
        const cmdSpan = line.querySelector(".t-cmd") as HTMLSpanElement;
        const cursor = line.querySelector(".t-cursor") as HTMLSpanElement;
        const text = item.cmd;
        if (reduced) {
          cmdSpan.textContent = text;
          item.out.forEach((o) => body.appendChild(lineEl(o[0], o[1])));
          i++;
          nextCmd();
          return;
        }
        let j = 0;
        (function type() {
          if (cancelled) return;
          if (j <= text.length) {
            cmdSpan.textContent = text.slice(0, j);
            j++;
            later(type, 18 + Math.random() * 30);
          } else {
            cursor.remove();
            let k = 0;
            (function outputs() {
              if (cancelled) return;
              if (k < item.out.length) {
                const o = item.out[k];
                body.appendChild(lineEl(o[0], o[1]));
                k++;
                later(outputs, 260);
              } else {
                i++;
                later(nextCmd, 420);
              }
            })();
          }
        })();
      }
      nextCmd();
    }

    const tio = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            tio.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    tio.observe(body);

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      tio.disconnect();
    };
  }, []);

  return (
    <div className="term" role="img" aria-label="终端演示：安装并配置 Hermes Agent">
      <div className="term-bar">
        <i></i>
        <i></i>
        <i></i>
        <span className="term-title">hermes — zsh</span>
      </div>
      <div className="term-body" ref={bodyRef}></div>
    </div>
  );
}
