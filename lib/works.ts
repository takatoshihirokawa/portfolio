export type Work = {
  slug: string
  title: string
  year: number
  tags: string[]
  description: string
  thumbnail: string
}

export const works: Work[] = [
  {
    slug: "kamiculum-learning-platform",
    title: "カミキュラム 美容室向け教育・学習Webアプリ",
    year: 2026,
    tags: ["Direction", "Development", "Design"],
    description: "美容室スタッフ向けのオンライン教育・学習プラットフォーム。",
    thumbnail: "/images/works/kamiculum.jpg",
  },
  {
    slug: "hanashiru-1on1-web-app",
    title: "ハナシル 1on1支援Webアプリ",
    year: 2026,
    tags: ["Direction", "Development", "Design", "Project Management"],
    description: "1on1面談を支援するWebアプリケーション。",
    thumbnail: "/images/works/hanashiru.jpg",
  },
  {
    slug: "hbl-kikuchi-fuma-campaign-site",
    title: "HBL × 菊池風磨 Campaign Site",
    year: 2026,
    tags: ["Direction", "Development"],
    description: "ブランドキャンペーンサイト。",
    thumbnail: "/images/works/hbl.jpg",
  },
  {
    slug: "kilel-brand-website-movie-production",
    title: "KILEL Brand Website & Movie Production",
    year: 2026,
    tags: ["Direction", "Produce"],
    description: "ブランドサイトと動画制作。",
    thumbnail: "/images/works/kilel.jpg",
  },
  {
    slug: "salonwriter-ai-writing-app",
    title: "SalonWriter 美容師向けAI文章生成Webアプリ",
    year: 2025,
    tags: ["Direction", "Development", "Design"],
    description: "美容師向けAI文章生成ツール。",
    thumbnail: "/images/works/salonwriter.jpg",
  },
  {
    slug: "joule-works-internal-management-app",
    title: "Joule Works 社内業務管理Webアプリ",
    year: 2025,
    tags: ["Direction", "Development", "Design"],
    description: "社内業務管理Webアプリケーション。",
    thumbnail: "/images/works/joule-works.jpg",
  },
]
