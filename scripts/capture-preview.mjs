import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  await mkdir(".tmp/screenshots", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => console.error("BROWSER:", error.message));
  await page.goto(process.env.PREVIEW_URL || "http://127.0.0.1:4310/", {
    waitUntil: "networkidle",
  });
  await page.screenshot({ path: ".tmp/screenshots/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: ".tmp/screenshots/home-mobile.png", fullPage: true });
  console.log("Saved desktop and mobile previews.");
} finally {
  await browser.close();
}
