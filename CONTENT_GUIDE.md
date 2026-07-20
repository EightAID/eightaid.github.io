# サイト内容の更新ガイド

このサイトは、ページの実装を触らずに `src/content` のMarkdownを編集して更新できます。

## よく使う編集先

| 変更したい内容 | 編集するファイル |
|---|---|
| サークル名、共通リンク、メール | `src/content/settings/site.md` |
| トップのコピー、ロゴ、背景画像 | `src/content/home/home.md` |
| 作品の詳細、基本情報、スクリーンショット | `src/content/products/*.md` |
| メンバー情報 | `src/content/members/*.md` |
| 過去作品 | `src/content/works/*.md` |
| 掲載記事・お知らせ | `src/content/articles/*.md` |
| 活動履歴 | `src/content/history/*.md` |

`---` で囲まれた範囲だけを編集します。行頭の空白は項目のまとまりを示すため、削除しないでください。

## トップページの文言を変える

`src/content/home/home.md` を開き、次の項目を編集します。

- `catchphrase`: メインコピー
- `introduction`: サークル紹介
- `heroImage`: トップ背景の横長キービジュアル
- `logoImage`: トップに重ねるサークルロゴ
- `productsLead`、`creatorsLead`、`articlesLead`: 各セクションの説明

## 新しい作品を追加する

1. `src/content/products/daisho-shojo.md` を複製する
2. ファイル名を作品URLに使う半角英数字へ変更する
3. タイトル、説明、画像、外部リンクを差し替える

`new-game.md` は `/products/new-game/` として公開されます。`cardImage` は作品一覧用、`socialImage` はSNSやチャットで共有したときのカード画像です。横長画像を指定してください。

## 共通リンクを変える

`src/content/settings/site.md` の `links` を編集します。

```yaml
links:
  steam: SteamページのURL
  x: XのURL
  youtube: YouTubeのURL
  unityroom: unityroomのURL
```

## スクリーンショットを差し替える

主要画像は `src/assets/images` に置きます。

```text
src/assets/images/screenshots/
```

同じファイル名で画像を上書きする場合、文言の変更は不要です。別名の画像を使う場合は `src/content/home/home.md` の `screenshots` にある `image` を変更します。

```yaml
- image: screenshots/daisho-screenshot-01.jpg
  alt: 画像の内容を説明する文章
  title: 短い見出し
  copy: 画面の説明
```

`alt` は画像が見えない利用者にも内容が伝わる説明にします。

## メンバーを追加する

1. `src/assets/images/members` にプロフィール画像を置く
2. `src/content/members` に既存ファイルを複製して新しいMarkdownを作る
3. ファイル名をURLに使いたい半角英数字にする
4. 名前、役割、画像、SNS、表示順を編集する

例: `new-member.md` は `/members/new-member/` になります。

個別プロフィールには短い紹介と過去作品一覧が表示されます。参加作品は `src/content/works/*.md` の `members` で紐づけます。

## 掲載記事を追加する

`src/content/articles/_template.md` を複製し、先頭の `_` を使わないファイル名に変更します。

```yaml
title: 記事タイトル
source: 掲載媒体名
publishedAt: 2026-07-20
url: https://example.com/article
category: Interview
featured: true
draft: false
order: 1
```

掲載記事には画像を使いません。準備中の記事は `draft: true` にすると表示されません。

## 他SNS・外部サイトを追加する

`src/content/settings/site.md` の `socialLinks` に項目を追加します。noteなどのURLもここへ追加できます。

```yaml
- name: note
  label: 制作記録
  description: 開発中の気づきや制作記録を掲載しています。
  url: https://note.com/アカウント名
```

## 活動履歴を追加する

`src/content/history` にMarkdownを追加します。

```yaml
---
date: "2026"
title: 出来事のタイトル
description: 短い説明
link: https://example.com/
order: 6
---
```

## 過去作品を追加する

`src/content/works` にMarkdownを追加します。

```yaml
---
title: 作品名
year: 2026
link: https://example.com/
image: /icons/example.png
imageAlt: 『作品名』のアイコン
members: [eightaid]
order: 17
---
```

- `members` には参加メンバーのファイル名を指定
- 複数人なら `[eightaid, beniimo]`
- `order` の小さい作品から先に表示

小さな作品アイコンは `public/icons` に置き、`/icons/ファイル名` と指定できます。

## ローカルで確認する

```bash
npm install
npm run dev
```

公開用の確認:

```bash
npm run build
npm run preview
```

入力漏れやURLの誤りがある場合、ビルド時に該当ファイルと項目が表示されます。

## 公開する

変更を `main` ブランチへ反映すると、GitHub Actionsが自動でビルドし、`https://daisho-project.com/` を更新します。

CloudflareのDNSレコード、GitHub PagesのCustom domain、所有確認用TXTレコードは削除しないでください。
