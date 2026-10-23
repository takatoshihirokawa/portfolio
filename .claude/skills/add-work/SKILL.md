---
name: add-work
description: ポートフォリオ（takatoshihirokawa.com）に実績を 1 件登録する。「Works に登録して」「実績を追加して」「ポートフォリオに載せて」と言われたとき、または画像・URL・資料を渡されて実績にしたいと言われたときに使う。質問しながら各項目を埋め、画像を整えて、下書きで登録する。
---

# 実績を登録する（add-work）

オーナーはノーコード中心の開発者。返事は日本語で、短く、やさしく。
質問は **一度に詰め込まず**、選べるものは選択肢（AskUserQuestion）で出す。自由に書いてほしいものだけ文章で聞く。

## 前提（変えないこと）

- データ：Supabase プロジェクト `mccgdiqudmlaxqoiekel`、テーブル `public.portfolio_works`（Supabase の MCP の `execute_sql` を使う）
- コード：GitHub `takatoshihirokawa/portfolio`（このリポジトリ）。`main` に push すると Vercel が本番に出す
- 管理画面：https://takatoshihirokawa.com/admin（オーナーが最後に確認して公開する場所）
- **リポジトリは公開**。合言葉付き（secret）の実績の画像は、リポジトリに入れない（下の「画像」参照）

## 進め方

### 1. 材料をもらう

最初にこう伝える：

> 実績の登録を始めます。画像（サムネイルにしたいもの、画面のスクショなど）があれば、何枚でもこのチャットに貼ってください。URL や資料、メモもあれば一緒にどうぞ。

- URL があれば中身を読みに行き、事実（何の会社か、何のページか）を拾う
- 渡された画像は見て、何が写っているかを把握しておく
- 材料から分かることは、聞かずに埋める。分からないことだけ聞く

### 2. 選択肢で聞く（AskUserQuestion）

1 回目（まとめて 1 回で聞く。4 問まで）：

| 質問 | 選択肢 |
|---|---|
| 載せる場所は？ | Works（受けた仕事）／ Lab（自分で作って運用しているもの） |
| 見せ方は？ | 公開（誰でも見られる）／ 合言葉付き（一覧・検索に出さない）／ 下書きのまま |
| どの立場で？ | フリーランス（Freelance）／ 広告会社の時代（Agency） |
| 種類は？ | Webアプリ・サービス（App / Service）／ Webサイト（Web）／ 広告・映像（Advertising）／ その他（Other） |

※ Lab を選んだら、種類は自動で `Lab` にする（種類の質問の答えは使わない）。

2 回目：**担当領域**（multiSelect: true）。選択肢は 4 つまでなので 2 問に分ける：

- 担当領域（主なもの）：Direction（ディレクション）／ Development（構築・開発）／ Design（デザイン）／ Produce（制作プロデュース）
- 担当領域（ほか）：Planning（企画）／ AI（AI 活用）／ Automation（自動化）／ Movie（映像）

選ばれたものが `tags`。`role` は、選ばれたものを日本語にして「・」でつなぐ（例：`ディレクション・構築・開発・デザイン`）。並びは 企画 → 制作プロデュース → ディレクション → デザイン → 構築・開発 → AI 活用 → 自動化 → 映像。

### 3. 文章で聞く（材料で分からなかったものだけ）

1 つのメッセージに、番号付きで短く並べる。分かっているものは「〇〇で合っていますか？」と確認の形にする。

1. タイトル（例：`株式会社〇〇 Corporate Website`、`〇〇 美容師向けAI文章生成Webアプリ`、`〇〇 × タレント名 Campaign Site`）
2. クライアント名（自社なら `自社サービス`、Lab なら `自主運用`）
3. 実施年（西暦）
4. URL（公開中のサイトがあれば。なければなし）
5. どんな状況・課題があったか（ひとことでも OK）
6. 何をしたか、工夫したところ（ひとことでも OK。ツール名があれば：Bubble、Studio、Next.js、Stripe など）

答えが短くても、こちらで文章に整える。足りなければ 1 つだけ追加で聞く。

### 4. 文章を書く

既存の実績と同じトーンにそろえる（である調・体言止め。誇張しない。使った道具は具体的に）。

- `summary`（一覧と冒頭に出る。80〜150 字）：「〇〇を制作。△△を担当。」の形。最後は担当範囲で締める
  - 例：`株式会社フジコンのコーポレートサイトを制作。サイト全体のディレクションと、Studioを用いたWebサイト構築を担当。`
- `background`（背景。100〜250 字）：どんな状況で、何が求められたか
- `approach`（進め方。150〜400 字）：何をどう進めたか、工夫、使った仕組み
- `slug`：英小文字とハイフンだけ。例 `fuji-con-corporate-website`。既存と重ならないか確認する：
  `select slug from portfolio_works where slug = '<slug>';`

書いたら、**登録する前に** 全項目をまとめて見せて「これで登録してよいですか？」と確認する。直したい所があれば直す。

### 5. 画像

- **サムネイル**（必須）：16:9、横 1600×900 の webp。渡された画像から一番よいものを選び、16:9 に切り出す（中央か上寄せ）。複数の画面がある場合は、背景を薄いグレー（#eeeeee）にして 2〜4 枚を並べたコラージュにしてもよい
- **スクショ**（任意）：縦に長い全画面の画像があれば、横 1600 に縮めて webp にする
- Python（Pillow）で変換する。品質は 82 前後

置き場所：

- **公開・下書き**：`public/images/works/<slug>.webp`（スクショは `<slug>-full.webp`）に保存し、コミットして `main` に push する。データには `/images/works/<slug>.webp` と書く
- **合言葉付き**：リポジトリに入れない（公開リポジトリなので誰でも見られてしまう）。画像はスクラッチパッドに作ってオーナーに送り（SendUserFile）、「管理画面でこの実績を開いて、サムネイルの『Upload』からこの画像を入れてください」と頼む。データの thumbnail は空（null）で登録する

### 6. 登録する

`execute_sql` で INSERT。文章は `$t$...$t$` のドル記号クォートで囲む（文中の ' や改行で壊れないように）。

```sql
insert into portfolio_works
  (slug, title, year, category, tags, client, affiliation, role, url,
   summary, background, approach, thumbnail, screenshot, published, secret, pinned)
values
  ($t$<slug>$t$, $t$<title>$t$, <year>, $t$<category>$t$, array[$t$Direction$t$, ...],
   $t$<client>$t$, $t$<Freelance|Agency>$t$, $t$<role>$t$, <url か null>,
   $t$<summary>$t$, $t$<background>$t$, $t$<approach>$t$,
   <'/images/works/<slug>.webp' か null>, <スクショ か null>,
   false, <合言葉付きなら true>, false)
returning id;
```

- **published は必ず false（下書き）で入れる**。公開はオーナーが管理画面で確認してから行う。「公開」を選ばれていても同じ（最後に公開の手順を伝える）
- 合言葉付きを選ばれたら `secret = true`
- 画像を push したら、Vercel のデプロイが終わるまで待つ（`https://takatoshihirokawa.com/images/works/<slug>.webp` が 200 になるまで）

### 7. 最後に伝えること

- 管理画面の、この実績の編集ページ：`https://takatoshihirokawa.com/admin/works/<id>`
- 「内容を確認して、よければ『公開する』にチェックを入れて『保存する』を押してください」
- 合言葉付きなら「『公開する』と『合言葉で見せる』の両方にチェック」
- 合言葉付きで画像がある場合は、Upload のお願いをもう一度

## やらないこと

- オーナーの確認なしに `published = true` にしない
- 既存の実績を消したり、上書きしたりしない（直すときは確認してから UPDATE）
- 合言葉付きの実績の画像・名前を、コミットメッセージや公開の場所に書かない
- 「確認した」と言うのは、実際に確認したことだけ
