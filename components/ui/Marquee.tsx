"use client"

const ITEMS = [
  "Planning",
  "Direction",
  "Development",
  "AI × Web",
  "NoCode / LowCode",
  "UX Design",
  "Web App",
  "SNS Strategy",
  "Project Management",
  "DX Support",
]

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="relative border-y border-[var(--border)] overflow-hidden py-4 select-none">
      <div className="marquee-track flex gap-10 w-max">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[9px] tracking-[0.45em] uppercase text-[var(--muted-fg)] whitespace-nowrap">
            {item}
            <span className="text-[var(--accent)] text-base leading-none" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
