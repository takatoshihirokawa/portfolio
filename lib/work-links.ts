// 実績の URL 欄から、詳細ページに出すリンクを作る。
// 1行に1つ。「ラベル https://...」と書くとラベル付きで並ぶ（例：「AI Review https://service.kosoa.co.jp/ai-review」）。
// URL だけの1行（今までの書き方）は、ラベルなしの「Visit Site」になる。
export type WorkLink = { label: string | null; href: string }

export function parseWorkLinks(value: string | null | undefined): WorkLink[] {
  if (!value) return []
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .flatMap((line) => {
      const m = line.match(/https?:\/\/\S+/)
      if (!m) return []
      const label = (line.slice(0, m.index) + line.slice((m.index ?? 0) + m[0].length)).replace(/[|｜:：\s]+$/u, "").replace(/^[|｜:：\s]+/u, "").trim()
      return [{ label: label || null, href: m[0] }]
    })
}
