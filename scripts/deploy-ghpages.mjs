// Deploys dist/ to GitHub Pages (gh-pages branch).
// Adds SPA fallback (404.html) and the custom domain CNAME before publishing.
import { copyFileSync, writeFileSync } from "node:fs";
import { publish } from "gh-pages";

const CUSTOM_DOMAIN = "hermes-agent.ndjp.net";

// SPA fallback: GitHub Pages serves 404.html for unknown client-side routes.
copyFileSync("dist/index.html", "dist/404.html");
// Custom domain: GitHub Pages reads CNAME automatically.
writeFileSync("dist/CNAME", CUSTOM_DOMAIN);

publish(
  "dist",
  {
    branch: "gh-pages",
    repo: "https://github.com/bbylw/hermes-agent-cn.git",
    message: "deploy: " + new Date().toISOString(),
  },
  (err) => {
    if (err) {
      console.error("Deploy failed:", err);
      process.exit(1);
    }
    console.log("Published to gh-pages ✔");
  }
);
