import type { ReactNode } from "react";
import { delay } from "../lib/reveal";

function Card({
  num,
  icon,
  title,
  children,
  visual,
  span,
  delaySeconds,
}: {
  num: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  visual: ReactNode;
  span: "span7" | "span5";
  delaySeconds?: string;
}) {
  return (
    <article
      className={`card ${span} reveal`}
      style={delaySeconds ? delay(delaySeconds) : undefined}
    >
      <div className="card-top">
        <div className="card-icon">{icon}</div>
        <span className="card-num">{num}</span>
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
      <div className="card-visual">{visual}</div>
    </article>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const checkStroke = (
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

const clockSmall = (
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
);

const SCHED = [
  { time: "每日 08:00", task: "AI 新闻简报推送到 Telegram" },
  { time: "每周五 18:00", task: "项目周报汇总并备份" },
  { time: "每月 1 日", task: "依赖安全审计扫描" },
];

const MEM = [
  { k: "你的技术栈与代码偏好", tag: "已学习" },
  { k: "skill: 每周报告生成器", tag: "自动生成" },
  { k: "历史问题解决方案存档", tag: "永不遗忘" },
];

const SUBAGENTS = [
  { id: "A", role: "分类打标" },
  { id: "B", role: "去重合并" },
  { id: "C", role: "生成摘要" },
];

const SEARCH_CHIPS = ["网页搜索", "浏览器自动化", "视觉理解", "图像生成", "语音合成", "多模型推理"];

const PLATFORMS = ["Telegram", "Discord", "Slack", "WhatsApp", "Signal"];

const SANDBOXES = ["Local", "Docker", "SSH", "Singularity", "Modal"];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">01 — 核心特性</div>
            <h2 className="sec-title">
              一个智能体，
              <br />
              六种超能力
            </h2>
          </div>
          <p className="sec-desc">
            从连接、记忆到自动化与沙箱，Hermes 把散落各处的工具收敛为一个持续进化的数字伙伴。
          </p>
        </div>

        <div className="bento">
          <Card
            span="span7"
            num="/ 01 · 连接"
            title="无处不在"
            icon={
              <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            }
            visual={
              <div className="chips">
                {PLATFORMS.map((platform) => (
                  <span key={platform} className="chip">
                    <span className="live"></span>
                    {platform}
                  </span>
                ))}
                <span className="chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                  邮件
                </span>
                <span className="chip">
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
                  CLI
                </span>
                <span className="chip" style={{ borderStyle: "dashed" }}>
                  + 持续接入中
                </span>
              </div>
            }
          >
            Telegram、Discord、Slack、WhatsApp、Signal、邮件、CLI——平台清单还在增长。
            <strong>一个智能体，一份记忆，覆盖每一个界面。</strong>
          </Card>

          <Card
            span="span5"
            delaySeconds=".08s"
            num="/ 02 · 记忆"
            title="持久记忆"
            icon={
              <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <line x1="9" y1="21" x2="15" y2="21" />
              </svg>
            }
            visual={
              <div className="mem">
                {MEM.map((row) => (
                  <div key={row.k} className="mem-row">
                    {checkStroke}
                    <span className="k">{row.k}</span>
                    <span className="tag">{row.tag}</span>
                  </div>
                ))}
              </div>
            }
          >
            它学习你的项目、自动生成技能，<strong>永远记得</strong>自己是如何解决过一个问题。
          </Card>

          <Card
            span="span5"
            num="/ 03 · 调度"
            title="专注自动化"
            icon={clockSmall}
            visual={
              <div className="sched">
                {SCHED.map((row) => (
                  <div key={row.time} className="sched-row">
                    <span className="clock">{clockSmall}</span>
                    <span className="time">{row.time}</span>
                    <span className="task">{row.task}</span>
                    <span className="st">运行中</span>
                  </div>
                ))}
              </div>
            }
          >
            用自然语言安排报告、备份与简报——由网关无人值守运行，<strong>每一次都专注执行</strong>。
          </Card>

          <Card
            span="span7"
            delaySeconds=".08s"
            num="/ 04 · 委派"
            title="任务倍增"
            icon={
              <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="12" r="3" />
                <path d="M8.5 7.5 15.5 11M8.5 16.5 15.5 13" />
              </svg>
            }
            visual={
              <div className="tree">
                <div className="root">主智能体 · 接收任务「整理本周 GitHub Issues」</div>
                {SUBAGENTS.map((agent) => (
                  <div key={agent.id} className="branch">
                    子智能体 {agent.id} · <em>{agent.role}</em>
                    <span className="leaf">独立对话 · 独立终端 · python rpc</span>
                  </div>
                ))}
              </div>
            }
          >
            派出相互隔离的子智能体，各自拥有独立的对话、终端与 Python RPC 脚本，构建
            <strong>零上下文成本</strong>的流水线。
          </Card>

          <Card
            span="span7"
            num="/ 05 · 搜索"
            title="纵览网络"
            icon={
              <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            visual={
              <>
                <div className="search-mock">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>
                    帮我调研 2026 年端侧模型的发展趋势<span className="cursor"></span>
                  </span>
                </div>
                <div className="chips">
                  {SEARCH_CHIPS.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </>
            }
          >
            网页搜索、浏览器自动化、视觉理解、图像生成、语音合成与多模型推理，
            <strong>开箱即用</strong>。
          </Card>

          <Card
            span="span5"
            delaySeconds=".08s"
            num="/ 06 · 实验"
            title="隔离沙箱"
            icon={
              <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            }
            visual={
              <>
                <div className="chips">
                  {SANDBOXES.map((backend) => (
                    <span key={backend} className="chip">
                      {backend}
                    </span>
                  ))}
                </div>
                <div className="sandbox-note">
                  {checkStroke}
                  容器加固 · 命名空间隔离 · 默认启用
                </div>
              </>
            }
          >
            五种后端任选，配合容器加固与命名空间隔离，<strong>大胆实验，绝不波及宿主</strong>。
          </Card>
        </div>
      </div>
    </section>
  );
}
