<p align="center">
  <img src="https://raw.githubusercontent.com/NousResearch/hermes-agent/main/assets/banner.png" alt="Hermes Agent" width="100%">
</p>

# Hermes Agent ☤

<p align="center">
  <a href="https://hermes-agent.nousresearch.com/">Hermes Agent</a> | <a href="https://hermes-agent.nousresearch.com/">Hermes Desktop</a>
</p>
<p align="center">
  <a href="https://hermes-agent.nousresearch.com/docs/"><img src="https://img.shields.io/badge/Docs-hermes--agent.nousresearch.com-FFD700?style=for-the-badge" alt="文档"></a>
  <a href="https://discord.gg/NousResearch"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/NousResearch/hermes-agent/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="许可证：MIT"></a>
  <a href="https://nousresearch.com"><img src="https://img.shields.io/badge/Built%20by-Nous%20Research-blueviolet?style=for-the-badge" alt="由 Nous Research 构建"></a>
  <a href="https://github.com/NousResearch/hermes-agent/blob/main/README.zh-CN.md"><img src="https://img.shields.io/badge/Lang-中文-red?style=for-the-badge" alt="中文"></a>
  <a href="https://github.com/NousResearch/hermes-agent/blob/main/README.ur-pk.md"><img src="https://img.shields.io/badge/Lang-اردو-green?style=for-the-badge" alt="اردو"></a>
  <a href="https://github.com/NousResearch/hermes-agent/blob/main/README.es.md"><img src="https://img.shields.io/badge/Lang-Español-orange?style=for-the-badge" alt="Español"></a>
</p>

**由 [Nous Research](https://nousresearch.com) 打造的自我进化 AI 智能体。** 它是唯一内置学习回路的智能体——能从经验中创建技能、在使用中自我改进、主动提醒自己固化知识、检索自己过往的对话，并在多次会话之间逐步加深对「你是谁」的理解。它可以运行在 5 美元的 VPS、GPU 集群，或空闲时几乎零成本的无服务器基础设施上。它不绑定你的笔记本——当它在云端虚拟机上工作时，你可以通过 Telegram 与它对话。

使用任意你想要的模型——[Nous Portal](https://portal.nousresearch.com)、OpenRouter、OpenAI、你自己的端点，以及[更多](https://hermes-agent.nousresearch.com/docs/integrations/providers)。用 `hermes model` 即可切换——无需改动代码，没有锁定。

<table>
<tr><td><b>真正的终端界面</b></td><td>完整的 TUI，支持多行编辑、斜杠命令自动补全、对话历史、中断并改向，以及流式工具输出。</td></tr>
<tr><td><b>随处可用</b></td><td>Telegram、Discord、Slack、WhatsApp、Signal 以及 CLI——全部通过单一网关进程。语音备忘录转录、跨平台对话连续性。</td></tr>
<tr><td><b>闭环学习回路</b></td><td>由智能体整理的记忆，并定期主动提醒。在复杂任务后自主创建技能。技能在使用过程中自我改进。基于 FTS5 的会话搜索，配合 LLM 摘要实现跨会话回溯。<a href="https://github.com/plastic-labs/honcho">Honcho</a> 辩证式用户建模。兼容 <a href="https://agentskills.io">agentskills.io</a> 开放标准。</td></tr>
<tr><td><b>定时自动化</b></td><td>内置 cron 调度器，可投递到任意平台。每日报告、夜间备份、每周审计——全部用自然语言描述，无人值守运行。</td></tr>
<tr><td><b>委派与并行</b></td><td>生成隔离的子智能体以并行处理多条工作流。编写通过 RPC 调用工具的 Python 脚本，将多步管道压缩为零上下文成本的回合。</td></tr>
<tr><td><b>随处运行，不止于你的笔记本</b></td><td>七种终端后端——本地、Docker、SSH、Singularity、Modal、Daytona 以及 Vercel Sandbox。Daytona 和 Modal 提供无服务器持久化——你的智能体环境在空闲时休眠，按需唤醒，会话之间几乎零成本。可在 5 美元 VPS 或 GPU 集群上运行。</td></tr>
<tr><td><b>面向研究</b></td><td>批量轨迹生成、轨迹压缩，用于训练下一代工具调用模型。</td></tr>
</table>

---

## 快速安装

### Linux、macOS、WSL2、Termux

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

### Windows（原生，PowerShell）

> **注意：** 原生 Windows 无需 WSL 即可运行 Hermes——CLI、网关、TUI 和工具全部原生运行。如果你更想用 WSL2，上面 Linux/macOS 的一行命令同样适用。发现 Bug？请[提交 issue](https://github.com/NousResearch/hermes-agent/issues)。

在 PowerShell 中运行：

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

安装程序会处理一切：uv、Python 3.11、Node.js、ripgrep、ffmpeg，**以及一个便携版 Git Bash**（MinGit，解压到 `%LOCALAPPDATA%\hermes\git`——无需管理员权限，与系统中的任何 Git 安装完全隔离）。Hermes 使用这个内置的 Git Bash 来运行 shell 命令。

如果你已经安装了 Git，安装程序会检测到并改用它。否则你只需要下载一个约 45MB 的 MinGit——它不会触碰或干扰任何系统 Git。

> **Android / Termux：** 经过测试的手动路径记录在 [Termux 指南](https://hermes-agent.nousresearch.com/docs/getting-started/termux) 中。在 Termux 上，Hermes 会安装精选的 `.[termux]` 额外依赖，因为完整的 `.[all]` 额外依赖目前会拉取与 Android 不兼容的语音依赖。
>
> **Windows：** 原生 Windows 已得到完全支持——上面的 PowerShell 一行命令会安装一切。如果你更想用 WSL2，Linux 命令同样适用。原生 Windows 安装位于 `%LOCALAPPDATA%\hermes`；WSL2 安装位于 `~/.hermes`，与 Linux 相同。

安装后：

```bash
source ~/.bashrc    # 重新加载 shell（或：source ~/.zshrc）
hermes              # 开始聊天！
```

### 故障排查

#### Windows Defender 或杀毒软件将 `uv.exe` 标记为恶意软件

如果你的杀毒软件（Bitdefender、Windows Defender 等）将 Hermes `bin` 文件夹（`%LOCALAPPDATA%\hermes\bin\uv.exe`）中的 `uv.exe` 隔离，这属于**误报**。该文件是 Astral 的 `uv`——Hermes 捆绑用于管理其 Python 环境的 Rust Python 包管理器。基于机器学习的杀毒引擎通常会将下载并安装包的未签名 Rust 二进制文件标记为恶意。

**验证你的副本是否真实：**

```powershell
# 如需要，安装 GitHub CLI
winget install --id GitHub.cli

# 登录 GitHub
gh auth login

# 运行验证
$uv = "$env:LOCALAPPDATA\hermes\bin\uv.exe"
$ver = (& $uv --version).Split(' ')[1]
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$zip = "$env:TEMP\uv.zip"
Invoke-WebRequest "https://github.com/astral-sh/uv/releases/download/$ver/uv-x86_64-pc-windows-msvc.zip" -OutFile $zip -UseBasicParsing
gh attestation verify $zip --repo astral-sh/uv
Expand-Archive $zip "$env:TEMP\uv_x" -Force
(Get-FileHash "$env:TEMP\uv_x\uv.exe").Hash -eq (Get-FileHash $uv).Hash
```

如果签名验证显示 "Verification succeeded" 且最后一行打印 `True`，就说明没问题。

**将 Hermes 加入白名单：**

- **Windows Defender：** 以管理员身份运行 PowerShell → `Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\hermes\bin"`
- **Bitdefender：** 在 Bitdefender 控制台中添加例外（Protection > Antivirus > Settings > Manage Exceptions）
- 将**文件夹**加入白名单，而不是文件哈希——Hermes 会更新 `uv`，而哈希在每个版本都会变化

更多背景，请参见上游 Astral 的报告：[astral-sh/uv#13553](https://github.com/astral-sh/uv/issues/13553)、[astral-sh/uv#15011](https://github.com/astral-sh/uv/issues/15011)、[astral-sh/uv#10079](https://github.com/astral-sh/uv/issues/10079)。

---

## 入门

```bash
hermes              # 交互式 CLI —— 开始一段对话
hermes model        # 选择你的 LLM 提供商和模型
hermes tools        # 配置启用哪些工具
hermes config set   # 设置单个配置项
hermes config get   # 打印单个配置项
hermes gateway      # 启动消息网关（Telegram、Discord 等）
hermes setup        # 运行完整设置向导（一次性配置所有内容）
hermes claw migrate # 从 OpenClaw 迁移（如果你来自 OpenClaw）
hermes update       # 更新到最新版本
hermes doctor       # 诊断任何问题
```

📖 **[完整文档 →](https://hermes-agent.nousresearch.com/docs/)**

---

## 免去收集 API 密钥的麻烦 —— Nous Portal

Hermes 可以使用你想要的任意提供商——这一点不会改变。但如果你不想为模型、网络搜索、图像生成、TTS 和云端浏览器分别收集五组独立的 API 密钥，**[Nous Portal](https://portal.nousresearch.com)** 用一个订阅覆盖了所有这些：

- **300+ 模型** —— 用 `/model <name>` 任选其一
- **工具网关（Tool Gateway）** —— 网络搜索（Firecrawl）、图像生成（FAL）、文本转语音（OpenAI）、云端浏览器（Browser Use），全部经由你的订阅路由。无需额外账号。

全新安装后只需一条命令：

```bash
hermes setup --portal
```

它会通过 OAuth 登录，将 Nous 设为你的提供商，并开启工具网关。随时用 `hermes portal info` 查看已连接的内容。完整细节见[工具网关文档页](https://hermes-agent.nousresearch.com/docs/user-guide/features/tool-gateway)。

你仍然可以随时为每个工具自带密钥——网关是按后端划分的，而非全有或全无。

---

## CLI 与消息平台速查

Hermes 有两个入口：用 `hermes` 启动终端 UI，或运行网关并通过 Telegram、Discord、Slack、WhatsApp、Signal 或邮件与它对话。一旦进入对话，许多斜杠命令在两个界面之间是共享的。

| 操作                  | CLI                                           | 消息平台                                                                     |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| 开始聊天              | `hermes`                                      | 运行 `hermes gateway setup` + `hermes gateway start`，然后给机器人发一条消息 |
| 开始新对话            | `/new` 或 `/reset`                            | `/new` 或 `/reset`                                                           |
| 切换模型              | `/model [provider:model]`                     | `/model [provider:model]`                                                    |
| 设置人格              | `/personality [name]`                         | `/personality [name]`                                                        |
| 重试或撤销上一轮      | `/retry`、`/undo`                             | `/retry`、`/undo`                                                            |
| 压缩上下文 / 查看用量 | `/compress`、`/usage`、`/insights [--days N]` | `/compress`、`/usage`、`/insights [days]`                                    |
| 浏览技能              | `/skills` 或 `/<skill-name>`                  | `/<skill-name>`                                                              |
| 中断当前工作          | `Ctrl+C` 或发送新消息                         | `/stop` 或发送新消息                                                         |
| 平台特定状态          | `/platforms`                                  | `/status`、`/sethome`                                                        |

完整命令列表，请参见 [CLI 指南](https://hermes-agent.nousresearch.com/docs/user-guide/cli) 和 [消息网关指南](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)。

---

## 文档

所有文档均位于 **[hermes-agent.nousresearch.com/docs](https://hermes-agent.nousresearch.com/docs/)**：

| 章节                                                                                       | 内容覆盖                                                   |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [快速开始](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)          | 安装 → 设置 → 2 分钟内完成首次对话                         |
| [CLI 用法](https://hermes-agent.nousresearch.com/docs/user-guide/cli)                      | 命令、键位绑定、人格、会话                                 |
| [配置](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)                | 配置文件、提供商、模型、所有选项                           |
| [消息网关](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)                | Telegram、Discord、Slack、WhatsApp、Signal、Home Assistant |
| [安全](https://hermes-agent.nousresearch.com/docs/user-guide/security)                     | 命令审批、私信配对、容器隔离                               |
| [工具与工具集](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools)       | 40+ 工具、工具集系统、终端后端                             |
| [技能系统](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)          | 程序化记忆、技能中心、创建技能                             |
| [记忆](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)              | 持久记忆、用户画像、最佳实践                               |
| [MCP 集成](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)             | 连接任意 MCP 服务器以扩展能力                              |
| [Cron 调度](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron)           | 带平台投递的定时任务                                       |
| [上下文文件](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files) | 塑造每次对话的项目上下文                                   |
| [架构](https://hermes-agent.nousresearch.com/docs/developer-guide/architecture)            | 项目结构、智能体循环、关键类                               |
| [贡献](https://hermes-agent.nousresearch.com/docs/developer-guide/contributing)            | 开发设置、PR 流程、代码风格                                |
| [CLI 参考](https://hermes-agent.nousresearch.com/docs/reference/cli-commands)              | 所有命令与参数                                             |
| [环境变量](https://hermes-agent.nousresearch.com/docs/reference/environment-variables)     | 完整的环境变量参考                                         |

---

## 从 OpenClaw 迁移

如果你来自 OpenClaw，Hermes 可以自动导入你的设置、记忆、技能以及 API 密钥。

**在首次设置期间：** 设置向导（`hermes setup`）会自动检测 `~/.openclaw`，并在配置开始前提供迁移选项。

**安装后的任何时候：**

```bash
hermes claw migrate              # 交互式迁移（完整预设）
hermes claw migrate --dry-run    # 预览将迁移的内容
hermes claw migrate --preset user-data   # 不含密钥的迁移
hermes claw migrate --overwrite  # 覆盖已有的冲突项
```

将导入的内容：

- **SOUL.md** —— 人格文件
- **记忆** —— MEMORY.md 和 USER.md 条目
- **技能** —— 用户创建的技能 → `~/.hermes/skills/openclaw-imports/`
- **命令白名单** —— 审批模式
- **消息设置** —— 平台配置、允许的用户、工作目录
- **API 密钥** —— 允许列表中的密钥（Telegram、OpenRouter、OpenAI、Anthropic、ElevenLabs）
- **TTS 资源** —— 工作区音频文件
- **工作区指令** —— AGENTS.md（配合 `--workspace-target`）

查看 `hermes claw migrate --help` 获取所有选项，或使用 `openclaw-migration` 技能进行带 dry-run 预览的交互式智能体引导迁移。

---

## 贡献

我们欢迎贡献！请参阅[贡献指南](https://hermes-agent.nousresearch.com/docs/developer-guide/contributing)了解开发设置、代码风格和 PR 流程。

贡献者快速开始——使用标准安装程序，然后从它在 `$HERMES_HOME/hermes-agent`（通常为 `~/.hermes/hermes-agent`）创建的完整 git 检出目录进行开发。这与 `hermes update`、托管的 venv、惰性依赖、网关以及文档工具所使用的布局一致。

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
cd "${HERMES_HOME:-$HOME/.hermes}/hermes-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

手动克隆备用方案（适用于一次性克隆 / CI，你刻意不想要托管安装布局的情况）：

在克隆的源码树之外创建 venv——位于智能体所操作目录内部的 venv 可能会被智能体对自身检出运行的一条相对路径命令清除，从而在中途销毁正在运行的运行时。

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv ~/.hermes/venvs/hermes-dev --python 3.11
source ~/.hermes/venvs/hermes-dev/bin/activate
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## 社区

- 💬 [Discord](https://discord.gg/NousResearch)
- 📚 [技能中心](https://agentskills.io)
- 🐛 [Issue](https://github.com/NousResearch/hermes-agent/issues)
- 🔌 [computer-use-linux](https://github.com/avifenesh/computer-use-linux) —— 面向 Hermes 及其他 MCP 主机的 Linux 桌面控制 MCP 服务器，具备 AT-SPI 可访问性树、Wayland/X11 输入、截图以及合成器窗口定位。
- 🔌 [HermesClaw](https://github.com/AaronWong1999/hermesclaw) —— 社区微信桥接：在同一个微信账号上同时运行 Hermes Agent 和 OpenClaw。

---

## 许可证

MIT —— 参见 [LICENSE](https://github.com/NousResearch/hermes-agent/blob/main/LICENSE)。

由 [Nous Research](https://nousresearch.com) 构建。
