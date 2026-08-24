import { Link } from "react-router-dom";
import Logo, { LogoBlock } from "./Logo";

const PRODUCT_LINKS = [
  { to: "/#features", label: "核心特性" },
  { to: "/#download", label: "桌面端下载" },
  { to: "/#install", label: "终端安装" },
  { to: "/#portal", label: "订阅方案" },
];

const RESOURCE_LINKS = [
  { to: "/docs", label: "官方文档" },
  { to: "https://github.com/NousResearch/hermes-agent", label: "GitHub 仓库" },
  { to: "https://portal.nousresearch.com", label: "Nous 门户" },
];

const COMMUNITY_LINKS = [
  { to: "https://discord.gg/nousresearch", label: "Discord" },
  { to: "https://x.com/NousResearch", label: "X / Twitter" },
];

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="foot-col">
      <h4>{title}</h4>
      {links.map((link) => {
        if (link.to.startsWith("/")) {
          return (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          );
        }
        return (
          <a key={link.to} href={link.to} target="_blank" rel="noopener">
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-giant" aria-hidden="true">
          HERMES
        </div>
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="logo" to="/" aria-label="返回首页">
              <Logo size={30} />
              <LogoBlock />
            </Link>
            <p>
              开源 AI 智能体，驻留在你的设备上，连接你的一切。由 Nous Research 构建，以 MIT
              许可证开源。
            </p>
          </div>
          <FooterColumn title="产品" links={PRODUCT_LINKS} />
          <FooterColumn title="资源" links={RESOURCE_LINKS} />
          <FooterColumn title="社区" links={COMMUNITY_LINKS} />
        </div>
        <div className="foot-bottom">
          <span>MIT LICENSE · 2026 · HERMES AGENT v0.20.5</span>
          <span>
            中文重制版 · <span className="heart">界面重构概念稿</span> · 非官方页面
          </span>
        </div>
      </div>
    </footer>
  );
}
