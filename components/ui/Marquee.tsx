"use client"

const ITEMS = [
  "ホームページ",
  "販促・広告",
  "写真・映像",
  "採用ページ",
  "受付の仕組み化",
  "業務改善",
  "AI活用",
  "Webアプリ",
  "公式LINE",
  "何から頼めばよいか決まっていなくても",
]

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="relative border-y border-[var(--border)] overflow-hidden py-6 select-none">
      <div className="marquee-track flex gap-14 w-max">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-14 text-[10px] tracking-[0.3em] text-[var(--muted-fg)] whitespace-nowrap">
            {item}
            <span className="text-[var(--accent)] text-base leading-none" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
