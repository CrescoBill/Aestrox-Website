import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    reducedMotion: "reduce",
  });
  await page.goto(process.env.PREVIEW_URL || "http://127.0.0.1:4310/", {
    waitUntil: "networkidle",
  });
  await page.addStyleTag({
    content:
      ".utility-bar,.desktop-nav,.header-actions,.chat-launcher,.hero-actions,.hero-note{display:none!important}.site-header{position:static;border:0}.hero{padding:20px 0 40px!important}.hero-grid{gap:40px;grid-template-columns:0.95fr 1.05fr}.hero h1{font-size:54px}.lede{font-size:18px}",
  });
  await page.screenshot({ path: "public/social-preview.png" });
  console.log("Created social preview from the actual rendered homepage.");
} finally {
  await browser.close();
}
