export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[var(--muted-fg)] tracking-widest">
        <span>© 2026 Takatoshi Hirokawa</span>
        <a
          href="#top"
          className="uppercase hover:text-[var(--accent)] transition-colors"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  )
}
