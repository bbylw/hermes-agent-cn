# hermes-cn-react

Hermes Agent 中文落地页的 React 重构版 —— UI 与原版 `../hermes-cn/index.html` 完全一致。

## 技术栈（最新发行版）

| 组件                                                                    | 版本 |
| ----------------------------------------------------------------------- | ---- |
| React / ReactDOM                                                        | 19.2 |
| Vite+（统一工具链：Vite + Rolldown + Oxlint/Oxfmt + Vitest + 任务缓存） | 0.3  |
| Bun（包管理器 & 脚本运行时）                                            | 1.4  |
| TypeScript                                                              | 7.0  |

## 常用命令

```bash
bun install      # 安装依赖（生成 bun.lock，vp 会自动识别并包装 bun）
bun run dev      # vp dev   — Vite 原生 ESM 开发服务器 + HMR
bun run build    # vp build — 生产构建（Vite + Rolldown）
bun run preview  # vp preview — 预览生产构建
bun run check    # vp check — 格式化 / lint / 类型检查一次跑完
```

## 结构

```
index.html              入口 HTML（字体 / meta 与原版一致）
vite.config.ts          Vite+ 单一配置文件
src/index.css           全部样式（自原版 <style> 逐字迁移）
src/main.tsx            挂载入口
src/App.tsx             页面组装 + reveal 观察器
src/components/         Nav / Hero / Terminal / Marquee / Stats / Features /
                        InstallSection / DownloadSection / Portal / SiteFooter / Logo
src/lib/reveal.ts       滚动入场动画 hook（IntersectionObserver 参数与原版一致）
```
