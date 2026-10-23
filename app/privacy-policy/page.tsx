import Link from "next/link"

export const metadata = {
  title: "プライバシーポリシー | Takatoshi Hirokawa",
  description: "お問い合わせフォームでお預かりする個人情報の取り扱いについて。",
}

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. お預かりする情報",
    body: <p>お問い合わせフォームから送信いただいた、お名前、メールアドレス、ご相談内容をお預かりします。</p>,
  },
  {
    h: "2. 利用目的",
    body: <p>お問い合わせへの返信、ご相談内容の確認、お見積もりやお打ち合わせのご連絡のためにのみ利用します。営業メールの一斉配信などには利用しません。</p>,
  },
  {
    h: "3. 保管と管理",
    body: (
      <p>
        お預かりした情報は、データベースサービス（Supabase）に保存し、運営者本人だけが閲覧できるよう管理します。
        また、返信漏れを防ぐため、送信内容を運営者が使う連絡ツール（Slack）に通知しています。
        これらのサービスは、情報を保存・転送するために利用しているもので、運営者以外が内容を利用することはありません。
      </p>
    ),
  },
  {
    h: "4. 第三者への提供",
    body: <p>法令に基づく場合を除き、ご本人の同意なく第三者に提供することはありません。</p>,
  },
  {
    h: "5. 開示・訂正・削除",
    body: <p>ご自身の情報の確認、訂正、削除をご希望の場合は、お問い合わせフォームからご連絡ください。ご本人であることを確認したうえで、速やかに対応します。</p>,
  },
  {
    h: "6. アクセス情報について",
    body: <p>このサイトでは、閲覧の分析を目的としたツール（アクセス解析）や広告用の Cookie は使用していません。管理画面へのログイン時のみ、ログイン状態を保つための Cookie を使用します。</p>,
  },
  {
    h: "7. 改定",
    body: <p>内容を改定する場合は、このページでお知らせします。</p>,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-40 px-6 sm:px-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors">
          <span>←</span> Home
        </Link>
        <h1 className="mt-14 mb-4 font-display text-3xl sm:text-4xl font-light tracking-wide">プライバシーポリシー</h1>
        <p className="text-base text-[var(--muted-fg)] leading-8 mb-14">
          廣川 貴理（以下「運営者」）は、このサイトでお預かりする個人情報を、以下のとおり取り扱います。
        </p>
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-medium mb-3">{s.h}</h2>
              <div className="text-base leading-8 opacity-85">{s.body}</div>
            </section>
          ))}
        </div>
        <p className="mt-16 text-sm text-[var(--muted-fg)]">制定日：2026年10月23日</p>
      </div>
    </div>
  )
}
