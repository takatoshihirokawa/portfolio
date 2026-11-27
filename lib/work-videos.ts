// 実績の「動画」欄から、詳細ページに並べる動画を作る。
// 1行に1つ。「ラベル /videos/works/xxx.mp4」（サイト内）か「ラベル https://...mp4」と書く。
// サイト内の動画は、同じ名前の .webp があれば再生前の画像（ポスター）に使う。
export type WorkVideo = { label: string | null; src: string; poster: string | null }

export function parseWorkVideos(value: string | null | undefined): WorkVideo[] {
  if (!value) return []
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .flatMap((line) => {
      const m = line.match(/(?:https?:\/\/|\/)\S+\.(?:mp4|webm|mov)\b/i)
      if (!m) return []
      const label = (line.slice(0, m.index) + line.slice((m.index ?? 0) + m[0].length)).replace(/[|｜:：\s]+$/u, "").replace(/^[|｜:：\s]+/u, "").trim()
      const poster = m[0].startsWith("/") ? m[0].replace(/\.(?:mp4|webm|mov)$/i, ".webp") : null
      return [{ label: label || null, src: m[0], poster }]
    })
}
