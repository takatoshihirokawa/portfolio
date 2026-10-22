export function glitchToggleTheme() {
  const html = document.documentElement
  if (html.classList.contains("glitching")) return
  html.classList.add("glitching")
  window.setTimeout(() => {
    html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light"
  }, 280)
  window.setTimeout(() => html.classList.remove("glitching"), 700)
}
