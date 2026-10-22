import type { Metadata } from "next"
import { Inter, Noto_Sans_JP, Syne } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/ui/CustomCursor"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import BackToTop from "@/components/ui/BackToTop"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nu-inky-79.vercel.app"),
  title: "Takatoshi Hirokawa | WebとデジタルのAI・制作",
  description:
    "廣川貴理のポートフォリオ。Web・デジタル企画からWebアプリ開発、SNS・広告施策、AI活用支援まで。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      id="top"
      data-theme="light"
      className={`${inter.variable} ${notoSansJP.variable} ${syne.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
