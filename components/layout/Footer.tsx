export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex items-start justify-between text-xs text-[var(--muted-fg)] tracking-widest">
        <span className="flex flex-col gap-1">
          <span>© 2026 Takatoshi Hirokawa</span>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="normal-case tracking-normal text-[10px] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-opacity">
            湖の輪郭：© OpenStreetMap contributors
          </a>
        </span>
        <span className="uppercase">Kawaguchiko, Yamanashi</span>
      </div>
    </footer>
  )
}
