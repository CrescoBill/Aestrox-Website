import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4311";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const failures = [];
const reports = [];
try {
  await mkdir(".tmp/screenshots", { recursive: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(20000);
  page.on("pageerror", (error) => failures.push(page.url() + ": " + error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /Content Security Policy|Hydration|hydration/.test(message.text())
    )
      failures.push(message.text());
  });
  const routes = [
    "/",
    "/products/pos",
    "/features",
    "/hardware",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/integrations",
    "/billing",
  ];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator("main h1").count(), 1, route + " has one h1");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert.equal(overflow, false, route + " overflows at " + width);
      assert.match(await page.title(), /Aestrox/);
    }
    console.log("Responsive routes passed at " + width + "px.");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  console.log("Page/viewport checks passed; checking accessibility and interactions.");
  for (const route of ["/", "/pricing", "/contact", "/features", "/privacy"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    reports.push({
      route,
      violations: audit.violations.map((item) => ({
        id: item.id,
        impact: item.impact,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          failureSummary: node.failureSummary,
        })),
      })),
    });
  }
  await page.goto(base + "/pricing", { waitUntil: "networkidle" });
  await writeFile(".tmp/accessibility-report.json", JSON.stringify(reports, null, 2));
  await page.getByRole("button", { name: "Monthly", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: "Monthly", exact: true }).getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "Contact for pricing" }).click();
  await page.getByRole("dialog").waitFor();
  assert.match(await page.getByRole("dialog").innerText(), /Monthly billing/);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  assert.match(await page.getByRole("dialog").innerText(), /Enter your name/);
  assert.equal(
    await page
      .getByLabel("Your name", { exact: true })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.getByLabel("Your name", { exact: true }).fill("Website tester");
  await page.getByLabel("Email address", { exact: true }).fill("tester@example.com");
  await page.getByLabel("Business name", { exact: true }).fill("Sample café");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  assert.match(await page.getByRole("alert").innerText(), /local preview/);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.equal(
    await page
      .getByRole("button", { name: "Contact for pricing" })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.screenshot({ path: ".tmp/screenshots/pricing-desktop.png", fullPage: true });

  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(
    await page
      .locator(".eyebrow-line,.device-note,.lucide-arrow-right,.lucide-arrow-up-right")
      .count(),
    0,
  );
  assert.equal(await page.locator(".chat-launcher").innerText(), "");
  assert.equal(await page.locator('a[href="mailto:contact@aestrox.com"]').count(), 1);
  assert.equal(await page.locator('a[href="tel:+353894243991"]').count(), 1);
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://aestrox.com/",
  );
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  assert.equal(schema["@graph"][0]["@type"], "Organization");
  await page.getByRole("button", { name: "Start your free trial", exact: true }).first().click();
  assert.match(await page.getByRole("dialog").innerText(), /free for 14 days/);
  assert.equal(
    await page.getByRole("dialog").locator('input[name="enquiry"]').inputValue(),
    "trial",
  );
  await page.keyboard.press("Escape");

  let calls = 0;
  await page.route("**/api/chat", (route) => {
    calls += 1;
    if (calls === 2)
      return route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Unavailable" }),
      });
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        reply: "Aestrox offers monthly and annual billing. Contact hello@aestrox.com for pricing.",
      }),
    });
  });
  await page.getByRole("button", { name: "Ask Aestrox AI assistant" }).click();
  await page.getByRole("dialog").getByRole("heading", { name: "Aestrox", exact: true }).waitFor();
  await page.getByRole("button", { name: "How does pricing work?" }).click();
  await page
    .getByText("Aestrox offers monthly and annual billing. Contact hello@aestrox.com for pricing.")
    .waitFor();
  await page.getByLabel("Your question").fill("What about printers?");
  await page.getByRole("button", { name: "Send question" }).click();
  await page.getByRole("button", { name: "Try again", exact: true }).waitFor();
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".chat-bubble.assistant").length === 2,
  );
  assert.equal(calls, 3);
  const chatAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  reports.push({
    route: "chat-open",
    violations: chatAudit.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  });
  await page.screenshot({ path: ".tmp/screenshots/chat-desktop.png" });
  await page.keyboard.press("Escape");
  // Every real product capture loads, reserves its space and is described.
  await page.goto(base + "/features", { waitUntil: "networkidle" });
  const shots = page.locator("img.shot");
  const shotCount = await shots.count();
  assert.ok(shotCount >= 8, "the features page shows the product captures");
  for (let index = 0; index < shotCount; index += 1) {
    const shot = shots.nth(index);
    await shot.scrollIntoViewIfNeeded();
    const state = await shot.evaluate(async (image) => {
      await image.decode().catch(() => undefined);
      return {
        src: image.currentSrc,
        loaded: image.complete && image.naturalWidth > 0,
        alt: image.alt.trim(),
        sized: Boolean(image.getAttribute("width") && image.getAttribute("height")),
      };
    });
    assert.ok(state.loaded, state.src + " loads");
    assert.ok(state.alt.length > 20, state.src + " has descriptive alt text");
    assert.ok(state.sized, state.src + " reserves its space");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: ".tmp/screenshots/home-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await page.waitForURL("**/contact");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.screenshot({ path: ".tmp/screenshots/contact-mobile.png", fullPage: true });
  const mobileAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  reports.push({
    route: "contact-mobile",
    violations: mobileAudit.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  });
  const notFound = await page.goto(base + "/this-page-does-not-exist", {
    waitUntil: "networkidle",
  });
  assert.equal(notFound.status(), 404);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: ".tmp/screenshots/home-desktop.png", fullPage: true });
  await page.screenshot({ path: ".tmp/screenshots/home-first-screen.png" });
  await writeFile(
    ".tmp/browser-report.json",
    JSON.stringify(
      { pages: routes.length, widths: [320, 390, 768, 1440], failures, accessibility: reports },
      null,
      2,
    ),
  );
  assert.equal(failures.length, 0, failures.join("\n"));
  assert.equal(
    reports.flatMap((report) => report.violations).length,
    0,
    "See .tmp/browser-report.json for accessibility findings",
  );
  console.log(
    "PASS: 48 page/viewport checks, keyboard/dialogs, pricing, form validation/local safety, chat success/failure/retry, screenshots, 404 and accessibility.",
  );
} finally {
  await browser.close();
}
