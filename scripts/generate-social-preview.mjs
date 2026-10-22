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
      ".utility-bar,.site-header,.chat-launcher{display:none!important}.hero{padding:44px 0!important}.hero-product-stage{min-height:500px!important}.hero .eyebrow{font-size:9px}.hero h1{font-size:52px}.hero-actions{display:none}.hero-copy{padding:0}.hero-description{font-size:18px}.hero-grid{gap:32px}",
  });
  await page.screenshot({ path: "public/social-preview.png" });
  console.log("Created social preview from the actual rendered homepage.");
} finally {
  await browser.close();
}
