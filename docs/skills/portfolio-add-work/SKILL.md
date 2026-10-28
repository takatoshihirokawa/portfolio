---
name: portfolio-add-work
description: 廣川のポートフォリオ（takatoshihirokawa.com）に実績を 1 件、下書きで登録する。「ポートフォリオに載せて」「Works に登録して」「Lab に追加して」「実績にして」と言われたら、どのリポジトリのセッションでも使う。今のセッションで作ったものを読んで下書きを書き、足りない所だけ選択肢と短い質問で埋め、サムネイルを作って登録する。
---

# ポートフォリオに実績を登録する（portfolio-add-work）

相手はノーコード中心の開発者（廣川）。返事は日本語で、短く、やさしく。
**今いるセッションの中で完結させる。** 新しいセッションを開いてもらわない。

## 固定の情報

- サイト：https://takatoshihirokawa.com 、管理画面：https://takatoshihirokawa.com/admin
- データ：Supabase プロジェクト `mccgdiqudmlaxqoiekel` のテーブル `public.portfolio_works`
  - Supabase の MCP（`execute_sql`）で読み書きする。Supabase の接続が複数あるときは、`list_projects` でこのプロジェクトが見える方を使う
- 画像の置き場：GitHub `takatoshihirokawa/portfolio` の `public/images/works/`（**公開リポジトリ**）。`main` に push すると Vercel が本番に出す
- この SKILL.md の隣の `scripts/` に、画面撮影（`shoot.mjs`）とサムネイル作成（`thumb.py`）がある

## 1. まず、今のセッションで作ったものを読む（質問の前に）

聞く前に、分かることは自分で調べて埋める。
- 今のリポジトリ：README、LP やトップページの文言、`package.json` などから「何を、誰のために、何で作ったか」
- 公開 URL（README、`vercel.json`、環境設定、会話の中から）
- この会話でユーザーと一緒にやったこと（機能、工夫、決めたこと）
- 既存の実績と重ならないか：
  `select slug, title from portfolio_works where title ilike '%<名前>%' or url ilike '%<ドメイン>%';`
  → すでにあれば「新しく作る／既存を直す」を聞く

そのうえで最初にこう伝える：
> ポートフォリオへの登録を始めます。このセッションの内容から下書きを作ります。載せたい画像があれば、このチャットに貼ってください（なければ公開ページを撮って作ります）。

## 2. 選択肢で聞く（AskUserQuestion）

1 回目（4 問まで。読み取れて確実なものは「（おすすめ）」を付けて先頭に）：

| 質問 | 選択肢 |
|---|---|
| 載せる場所は？ | Works（受けた仕事）／ Lab（自分で作って運用しているもの） |
| 見せ方は？ | 公開（誰でも見られる）／ 合言葉付き（一覧・検索に出さない）／ 下書きのまま |
| どの立場で？ | フリーランス（Freelance）／ 広告会社の時代（Agency） |
| 種類は？ | Webアプリ・サービス（App / Service）／ Webサイト（Web）／ 広告・映像（Advertising）／ その他（Other） |

Lab を選んだら、種類は `Lab` にする（種類の答えは使わない）。

2 回目：**担当領域**（multiSelect: true）。4 つまでなので 2 問に分ける：
- 主なもの：Direction（ディレクション）／ Development（構築・開発）／ Design（デザイン）／ Produce（制作プロデュース）
- ほか：Planning（企画）／ AI（AI 活用）／ Automation（自動化）／ Movie（映像）

選ばれたものが `tags`。`role` は日本語にして「・」でつなぐ。並び：企画 → 制作プロデュース → ディレクション → デザイン → 構築・開発 → AI 活用 → 自動化 → 映像。

## 3. 文章で聞く（読み取れなかったものだけ）

番号付きで 1 つのメッセージにまとめる。読み取れたものは「〇〇で合っていますか？」と確認の形にする。
1. タイトル（例：`株式会社〇〇 Corporate Website`、`〇〇 美容師向けAI文章生成Webアプリ`）
2. クライアント名（自社なら `自社サービス`、Lab なら `自主運用`）
3. 実施年
4. 公開 URL（なければなし）
5. どんな状況・課題があったか（ひとことで OK）
6. 何をしたか、工夫したところ（ひとことで OK）

## 4. 文章を書く

既存の実績と同じトーン：である調・体言止め。誇張しない。使った道具は具体的に（Bubble、Studio、Next.js、Stripe など）。

- `summary`（80〜150 字）：「〇〇を制作。△△を担当。」の形
  - 例：`株式会社フジコンのコーポレートサイトを制作。サイト全体のディレクションと、Studioを用いたWebサイト構築を担当。`
- `background`（100〜250 字）：どんな状況で、何が求められたか
- `approach`（150〜400 字）：何をどう進めたか、工夫、使った仕組み
- `slug`：英小文字とハイフン。例 `fuji-con-corporate-website`。重複を確認：`select 1 from portfolio_works where slug = '<slug>';`

**書き方の決まり（オーナーの指示）**
- 使った道具や乗り換え前のサービスを悪く書かない（例：「Studio では手間がかかった」は書かない）。乗り換えた理由は「気分を新たに」程度にとどめる
- AI を使ったことは「AI を活用して」と書く。Claude Code などのツール名は書かない
- 運用の内側の話（無料プラン、止めないための仕組みなど）や赤裸々な事情は書かない。お客さんに伝わる価値に絞る

書けたら、**登録する前に**全項目をまとめて見せ、「これで登録してよいですか？」と確認する。

## 5. サムネイル（16:9、1600×900 の webp）

作業はスクラッチパッドなどの一時フォルダで行う。`<S>` はこのスキルの `scripts/` フォルダ。

- **画像を貼ってもらった場合**：一番よいものを選び `python3 <S>/thumb.py fit <画像> thumb.webp top`（中央で切るなら `center`）
- **公開 URL がある場合（画像なし）**：
  1. `node <S>/shoot.mjs <URL> <一時フォルダ>` → `pc.png` と `sp.png`
  2. `python3 <S>/thumb.py mockup pc.png sp.png thumb.webp`（PC 画面の手前にスマホを置いた画像）
- **縦長の全画面スクショ**を載せたいとき：`python3 <S>/thumb.py full <画像> full.webp`
- 作った画像は必ず自分で見て確認し、ユーザーにも送って見せる
- Playwright や Pillow がないと言われたら、`npm i -g playwright` / `pip install pillow` を入れてから再実行する

## 6. 画像を置く

**公開・下書きの実績**：ポートフォリオのリポジトリに入れる。
1. このセッションに `takatoshihirokawa/portfolio` がなければ追加する（クラウドのセッションなら `add_repo` を push 権限で）。クローンは今の作業フォルダの外（一時フォルダ）に作る
2. `public/images/works/<slug>.webp`（全画面は `<slug>-full.webp`）に置いて、そのリポジトリの `main` にコミットして push する。コミットの書き方はこのセッションのルールに従う
3. データには `/images/works/<slug>.webp` と書く
4. `https://takatoshihirokawa.com/images/works/<slug>.webp` が 200 を返すまで待つ（Vercel のデプロイ）

**合言葉付きの実績**：画像を GitHub に置かない（公開リポジトリなので誰でも見られる）。
画像をユーザーに送り（SendUserFile など）、「管理画面でこの実績を開き、Thumbnail の『Upload』から入れてください」と頼む。データの `thumbnail` は null で登録する。

## 7. 登録する

`execute_sql` で INSERT。文章は `$t$...$t$` で囲む（' や改行で壊れないように）。

```sql
insert into portfolio_works
  (slug, title, year, category, tags, client, affiliation, role, url,
   summary, background, approach, thumbnail, screenshot, published, secret, pinned)
values
  ($t$<slug>$t$, $t$<title>$t$, <year>, $t$<category>$t$, array[$t$Direction$t$, ...],
   $t$<client>$t$, $t$<Freelance|Agency>$t$, $t$<role>$t$, <$t$url$t$ か null>,
   $t$<summary>$t$, $t$<background>$t$, $t$<approach>$t$,
   <$t$/images/works/<slug>.webp$t$ か null>, <スクショ か null>,
   false, <合言葉付きなら true>, false)
returning id;
```

- **published は必ず false（下書き）**。「公開」を選ばれていても同じ。公開はオーナーが管理画面で確認してから
- `category` は `App / Service` `Web` `Advertising` `Lab` `Other` のどれか

## 8. 最後に伝えること

- 編集ページ：`https://takatoshihirokawa.com/admin/works/<id>`
- 「内容を確認して、よければ『公開する』にチェックを入れて『保存する』を押してください」
- 合言葉付きなら「『公開する』と『合言葉で見せる』の両方にチェック」。画像がある場合は Upload のお願いをもう一度
- 管理画面に入れないときは、ログイン画面で「メールアドレス＋パスワード」でログインする

## やらないこと

- 確認なしに `published = true` にしない。既存の実績を消したり、確認なしに上書きしたりしない
- 合言葉付きの実績の画像・名前を、コミットメッセージや公開の場所に書かない
- 「確認した」と言うのは、実際に確認したことだけ
