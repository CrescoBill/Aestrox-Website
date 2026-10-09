import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    // Discover the homepage dependencies together with React, before the first
    // render. Late optimization can mix old/new React chunks in an open tab.
    include: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
    ],
  },
});
