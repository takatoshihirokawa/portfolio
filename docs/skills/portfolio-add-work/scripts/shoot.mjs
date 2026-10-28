// Screenshot a live site at PC and phone size.
// Usage: node shoot.mjs <url> <outDir>   → <outDir>/pc.png, <outDir>/sp.png
import { createRequire } from "module"
import { existsSync } from "fs"

const [url, outDir = "."] = process.argv.slice(2)
if (!url) { console.error("usage: node shoot.mjs <url> <outDir>"); process.exit(1) }

// Find Playwright wherever this environment installed it.
const require = createRequire(import.meta.url)
const candidates = ["playwright", "/opt/node22/lib/node_modules/playwright", "/usr/local/lib/node_modules/playwright", "/usr/lib/node_modules/playwright"]
let pw
for (const c of candidates) { try { pw = require(c); break } catch {} }
if (!pw) { console.error("Playwright not found. Run: npm i -g playwright"); process.exit(1) }

const exe = ["/opt/pw-browsers/chromium", "/opt/google/chrome/chrome"].find((p) => existsSync(p))
const browser = await pw.chromium.launch(exe ? { executablePath: exe } : {})

const shots = [
  { name: "pc", viewport: { width: 1440, height: 810 }, deviceScaleFactor: 2 },
  { name: "sp", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
]
for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport, deviceScaleFactor: s.deviceScaleFactor, isMobile: s.isMobile, hasTouch: s.hasTouch })
  await page.goto(url, { waitUntil: "load", timeout: 60000 })
  await page.waitForTimeout(4000) // let entrance animations finish
  await page.mouse.move(-10, -10)
  await page.screenshot({ path: `${outDir}/${s.name}.png` })
  await page.close()
}
await browser.close()
console.log(`saved ${outDir}/pc.png and ${outDir}/sp.png`)
