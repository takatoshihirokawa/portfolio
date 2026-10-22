"use client"

export default function FlipText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`group/flip relative inline-block overflow-hidden align-top ${className ?? ""}`} aria-label={text}>
      <span aria-hidden className="block">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/flip:-translate-y-full"
            style={{ transitionDelay: `${i * 22}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
      <span aria-hidden className="block absolute left-0 top-full text-[var(--accent)]">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/flip:-translate-y-full"
            style={{ transitionDelay: `${i * 22}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  )
}
