import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Vite+ unified config: dev server, production build (Vite + Rolldown),
// checks (Oxlint/Oxfmt/type check) and task running live in this single file.
export default defineConfig({
  plugins: [react()],
});
