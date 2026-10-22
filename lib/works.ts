export type Work = {
  slug: string
  title: string
  year: number
  category: "App / Service" | "Web"
  tags: string[]
  client: string
  role: string
  url: string | null
  summary: string
  background: string
  approach: string
  thumbnail: string
  screenshot: string | null
}

export const works: Work[] = [
  {
    slug: "kamiculum-learning-platform",
    title: "カミキュラム 美容室向け教育・学習Webアプリ",
    year: 2026,
    category: "App / Service",
    tags: ["Direction", "Development", "Design"],
    client: "株式会社KOSOA",
    role: "企画・設計・開発",
    url: "https://kamiculum.com/lp/line",
    summary: "美容室の教育・育成を支援する学習プラットフォーム「カミキュラム」を企画・開発。サービス設計、UI・UX、Bubbleでの開発、動画配信、学習管理、フィードバック、決済、LINE通知まで一貫して担当し、実際の美容師からのフィードバックをもとに継続的な機能改善・拡張を行っている。",
    background: "美容室の教育現場では、カリキュラムの共有、技術習得の進捗確認、練習へのフィードバックなど、育成に関する情報やコミュニケーションが複数の手段に分散しやすい。教育する側の負担を減らしながら、学ぶ側も自身の進捗や次に取り組む内容を把握しやすい環境をつくることを目的に「カミキュラム」の開発をスタートした。 単に動画教材を配信するだけではなく、 「学ぶ → 実践する → 提出する → フィードバックを受ける → 次の学習につなげる」 という美容師教育の一連の流れを、ひとつのサービス上で完結できることを目指している。",
    approach: "サービス企画から情報設計、UI・UX、Bubbleでの開発まで一貫して担当。美容室ごとに異なる教育体制を想定し、役割・権限に応じたカリキュラム管理、動画視聴、課題提出、写真・動画を用いたフィードバック、進捗管理、学習ログなど、美容師教育に必要な機能を段階的に設計・実装した。 また、Stripeによる法人向けサブスクリプション決済、Cloudflareを利用した動画配信、LINEによる通知など、サービス運用に必要な外部サービスとの連携も構築している。 開発時に仕様を固定するのではなく、 実際に利用する美容師や運営側からのフィードバックをもとに、継続的にUI・UXや機能を改善していることもカミキュラムの特徴 。利用現場で生まれた要望を整理し、必要性や運用への影響を検討したうえで、機能としてサービスへ反映している。 その一例が、最近追加した フィード機能 。日報・相談・情報共有といった日常的なコミュニケーションをサービス内に集約し、投稿へのリアクションやコメント、既読管理、保存・保護といった機能を追加した。学習コンテンツだけでは拾いきれない、日々の育成コミュニケーションまで支援できるようサービスの役割を拡張している。 さらに、学習履歴や視聴時間の可視化、ユーザーごとの進捗管理、LINEを活用したフィードバック・進捗通知など、 「教育コンテンツを置く場所」から「教育そのものを運用するための基盤」へ発展させること を意識して機能拡張を続けている。",
    thumbnail: "/images/works/kamiculum-learning-platform.webp",
    screenshot: "/images/works/kamiculum-learning-platform-full.webp",
  },
  {
    slug: "hanashiru-1on1-web-app",
    title: "ハナシル 1on1支援Webアプリ",
    year: 2026,
    category: "App / Service",
    tags: ["Direction", "Development", "Design", "Project Management"],
    client: "株式会社KOSOA",
    role: "企画・UI/UX・開発・LP制作",
    url: "https://hanasu-shiru.jp/",
    summary: "1on1の記録・分析を通じて継続的な育成を支援するWebアプリ「ハナシル」を企画。UI・UX設計、初期開発後の機能改善・AI機能追加に加え、サービスLPのディレクション、デザイン、構築まで担当。",
    background: "1on1を実施しても、面談内容がその場限りになり、振り返りや次回のアクションにつながりにくいという課題に着目。面談内容を記録・分析し、継続的なコミュニケーションや育成に活用できる1on1支援サービスとして「ハナシル」を企画した。",
    approach: "サービス企画からWebアプリのUI・UX設計までを担当し、初期開発は外部エンジニアと連携して進行。その後はBubbleを中心に既存機能の修正や機能追加を行い、Difyや各種APIを活用したAI機能も拡張した。AIによる分析結果を起点に対話しながら内容を深掘りできる機能など、実際の1on1で活用しやすくするための改善を継続。あわせて、サービスの特徴や利用価値を伝えるLPについても、構成・デザイン・実装まで一貫して担当した。",
    thumbnail: "/images/works/hanashiru-1on1-web-app.webp",
    screenshot: "/images/works/hanashiru-1on1-web-app-full.webp",
  },
  {
    slug: "hbl-kikuchi-fuma-campaign-site",
    title: "HBL × 菊池風磨 Campaign Site",
    year: 2026,
    category: "Web",
    tags: ["Direction", "Development"],
    client: "株式会社JULIA IVY",
    role: "Webディレクション・構築",
    url: "https://cp.hbl.salon/",
    summary: "菊池風磨さんを起用したHBLのキャンペーンサイトを制作。WebディレクションとStudioでの構築を担当。",
    background: "菊池風磨さんを起用したHBLのキャンペーン施策に合わせ、モバイルでの閲覧・体験を中心とした特設サイトを制作。タレントビジュアルを活かしながら、スマートフォン上でキャンペーンの世界観や情報をスムーズに体験できるページ設計が求められた。",
    approach: "Webディレクションを担当し、ページ構成や情報の見せ方、制作進行を整理。モバイルでの閲覧を前提に、スクロール領域やコンテンツの見せ方を工夫しながらStudioで実装した。PCからアクセスした場合には、QRコードを読み取ってモバイル環境へ誘導するCTAを設け、デバイスごとの利用シーンを考慮した導線を設計した。",
    thumbnail: "/images/works/hbl-kikuchi-fuma-campaign-site.webp",
    screenshot: "/images/works/hbl-kikuchi-fuma-campaign-site-full.webp",
  },
  {
    slug: "kilel-brand-website-movie-production",
    title: "KILEL Brand Website & Movie Production",
    year: 2026,
    category: "Web",
    tags: ["Direction", "Produce"],
    client: "合同会社イースリー",
    role: "Webディレクション・映像プロデュース",
    url: "https://www.kilel.jp/",
    summary: "ゴルフアパレルブランド「KILEL」のブランドサイト制作とムービー制作を担当。Webサイトのディレクションに加え、ブランドムービーの制作プロデュースを行った。",
    background: "RED RICEがプロデュースするゴルフアパレルブランド「KILEL」のブランド展開に合わせ、ブランドサイトとムービーを制作。アパレルやゴルフ用品の商品ラインナップを見せながら、KILELらしいブランドイメージをWebと映像の両面で表現することが求められた。現在の公式サイトでも、ゴルフアパレルブランドとしてウェアやアクセサリーを展開しています。",
    approach: "Webではサイト全体の制作ディレクションを担当し、ブランドや商品の見せ方、ページ構成を整理しながら制作チームと連携して進行。あわせてムービー制作では制作プロデューサーとして、撮影準備から制作進行までを担当し、Webと映像を通じてブランドの世界観が一貫して伝わるよう制作を推進した。",
    thumbnail: "/images/works/kilel-brand-website-movie-production.webp",
    screenshot: null,
  },
  {
    slug: "salonwriter-ai-writing-app",
    title: "SalonWriter 美容師向けAI文章生成Webアプリ",
    year: 2025,
    category: "App / Service",
    tags: ["Direction", "Development", "Design"],
    client: "株式会社KOSOA",
    role: "企画・UI/UX・開発・LP制作",
    url: "https://service.kosoa.co.jp/salonwriter",
    summary: "美容師向けAI文章生成サービス「SalonWriter」を企画・開発。現役美容師へのヒアリングをもとに必要な機能やアウトプットを設計し、UI・UX、Bubble開発、AIプロンプト、Stripe決済、LP制作まで一貫して担当。",
    background: "美容師が日常的に行う集客・発信業務では、文章作成に時間がかかる一方、媒体や用途によって求められる内容やトーンも異なる。実際の現場で使いやすいAIサービスにするため、美容師へのヒアリングを行い、どのような機能が必要か、どのようなアウトプットであれば業務にそのまま活用できるかを整理するところから開発をスタートした。",
    approach: "ユーザーヒアリングをもとにサービスの機能要件とAIの出力内容を設計し、UI・UXからBubbleでのアプリ開発まで一貫して担当。用途ごとに実務で使いやすい文章を生成できるようAIプロンプトを継続的に調整し、サービス利用に必要なStripeによるサブスクリプション決済やアカウント周りの仕組みも実装した。あわせてサービスLPの構成・デザイン・Studioでの構築まで行い、プロダクト開発からユーザー獲得の導線までまとめて設計した。",
    thumbnail: "/images/works/salonwriter-ai-writing-app.webp",
    screenshot: "/images/works/salonwriter-ai-writing-app-full.webp",
  },
  {
    slug: "joule-works-internal-management-app",
    title: "Joule Works 社内業務管理Webアプリ",
    year: 2025,
    category: "App / Service",
    tags: ["Direction", "Development", "Design"],
    client: "株式会社JouleGroup",
    role: "業務整理・設計・開発",
    url: null,
    summary: "Joule Groupの社内業務を一元管理するWebアプリ「Joule Works」を企画・開発。チャットツール上に分散していた各種申請・承認業務を集約し、現在では勤怠・有給管理まで連動する社内業務基盤として運用されている。",
    background: "Joule Groupでは、各種提出物や申請・承認などの日常業務をチャットツールを中心に運用していた。業務の増加に合わせ、スタッフ・管理者双方がよりスムーズに情報を確認・管理できる環境をつくるため、社内業務をひとつのWebアプリに集約する「Joule Works」の開発をスタートした。",
    approach: "実際の業務フローを整理し、申請・承認の仕組みや権限設計、UI・UX設計、Bubbleでの開発まで一貫して担当。各種申請や提出物の管理からスタートし、実際の運用に合わせて継続的に機能を拡張。現在では勤怠管理や有給申請・残数管理まで連動し、日常的な社内業務を横断して支えるWebアプリとして運用されている。",
    thumbnail: "/images/works/joule-works-internal-management-app.webp",
    screenshot: "/images/works/joule-works-internal-management-app-full.webp",
  }
]
