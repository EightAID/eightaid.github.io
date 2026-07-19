# 代償プロジェクトページ Astro移行・リニューアル実装計画

更新日: 2026-07-19

## 実装状況（2026-07-20）

- デザインA「シネマティック・スプリット」を採用
- React + ViteからAstroへ移行
- 文言をコンテンツコレクションへ分離
- 主要画像をAstroの画像最適化へ移行
- トップ、特設、メンバー一覧・詳細、404を実装
- OGP、サイトマップ、robots.txtを設定
- 更新ガイドを作成
- 本番ビルド成功
- GitHub Pagesへの公開確認中

## 1. この計画の目的

現在の React + Vite 製サイトを Astro に移行し、次の状態を目指す。

- 各種説明や文言を、ページの実装コードを触らずに変更できる
- 画像の追加・差し替え・並び替えを簡単にする
- 『代償少女』と「代償プロジェクト」の世界観が伝わる、スタイリッシュな公式サイトにする
- PC・スマートフォンの両方で快適に閲覧できる
- 現在利用している GitHub Pages への自動公開を維持する
- 独自ドメイン `https://daisho-project.com/` を正式な公開URLとして使用する
- 作品やメンバーが増えても、同じ仕組みでページを追加できるようにする

## 2. 現状の確認結果

### 現在の技術構成

- React 19
- Vite
- React Router の `HashRouter`
- Tailwind CSS
- GitHub Actions から GitHub Pages へ自動公開

### 現在のページ

- トップページ
- メンバー一覧
- メンバー詳細
- 『代償少女』特設ページ
- 404ページ相当

### 現在の更新上の課題

- `src/App.tsx` にページ構造と多くの文言が集中している
- スクリーンショットの説明や外部リンクを変更するにもコード編集が必要
- メンバー情報は分離されているが、TypeScriptの記法を理解する必要がある
- 画像が `public/assets` と `public/icons` に混在している
- 同じ内容の画像が別名で重複している
- `HashRouter` のため、URLに `/#/members` のような `#` が入る
- キービジュアルを背景として使う比重が大きく、個々の素材を主役として見せきれていない

## 3. 採用する基本方針

### Astroを静的サイトとして使用する

サイトはログイン、データベース、投稿フォームなどを必要としないため、Astroで静的HTMLを生成する。

- 通常のページはAstroコンポーネントで構築する
- Reactは原則として外す
- ギャラリーなど操作が必要な部分だけ、小さなクライアント側JavaScriptを使う
- URLはAstroのファイルベースルーティングで生成する

### 表示とコンテンツを分離する

役割を次の3層に分ける。

1. `src/pages`：URLとページ全体の構成
2. `src/components`：見た目を作る再利用可能な部品
3. `src/content`：ユーザーが編集する文言、作品、メンバー、画像指定

Astroのコンテンツコレクションと入力スキーマを使い、必須項目の入力漏れや不正なURL・画像指定をビルド時に検出する。

公式資料:

- [Astro Content Collections](https://docs.astro.build/en/reference/modules/astro-content/)
- [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/)

## 4. 移行後のディレクトリ構成

```text
src/
├─ pages/
│  ├─ index.astro
│  ├─ special.astro
│  ├─ 404.astro
│  └─ members/
│     ├─ index.astro
│     └─ [id].astro
│
├─ layouts/
│  └─ BaseLayout.astro
│
├─ components/
│  ├─ layout/
│  │  ├─ SiteHeader.astro
│  │  ├─ MobileNavigation.astro
│  │  └─ SiteFooter.astro
│  ├─ sections/
│  │  ├─ HeroSection.astro
│  │  ├─ GameIntroduction.astro
│  │  ├─ ScreenshotGallery.astro
│  │  ├─ MovieSection.astro
│  │  └─ MemberSection.astro
│  ├─ cards/
│  │  ├─ MemberCard.astro
│  │  └─ WorkCard.astro
│  └─ ui/
│     ├─ ButtonLink.astro
│     ├─ SectionHeading.astro
│     └─ ExternalLink.astro
│
├─ content/
│  ├─ settings/
│  │  └─ site.yaml
│  ├─ pages/
│  │  ├─ home.md
│  │  └─ special.md
│  ├─ members/
│  │  ├─ eightaid.md
│  │  └─ beniimo.md
│  └─ works/
│     └─ 各作品のMarkdownファイル
│
├─ assets/
│  └─ images/
│     ├─ hero/
│     ├─ screenshots/
│     ├─ members/
│     └─ works/
│
├─ styles/
│  ├─ global.css
│  ├─ tokens.css
│  └─ utilities.css
│
└─ content.config.ts

public/
├─ favicon.png
├─ og.png
├─ robots.txt
└─ movies/
```

## 5. 文言を変更しやすくする設計

### `site.yaml`で管理する内容

- サークル名、日本語名、英語名
- 共通ナビゲーション
- 問い合わせメールアドレス
- X、YouTube、SteamのURL
- フッター文言
- SEO用のサイトタイトルと説明

例:

```yaml
name: 代償プロジェクト
nameEn: Daishou Project
description: インディーゲーム制作サークル「代償プロジェクト」の公式サイトです。

links:
  steam: https://store.steampowered.com/app/3839720/_/?l=japanese
  x: https://x.com/AIDunity
  youtube: https://www.youtube.com/watch?v=jGvsuUJM0E0

contact:
  email: eightaidgames@gmail.com
```

### `home.md`で管理する内容

- トップの肩書き
- メインコピー
- サブコピー
- サークル紹介
- 『代償少女』の短い紹介
- 各セクションの見出しと補足
- スクリーンショットと説明文
- ボタンの文言

### `special.md`で管理する内容

- ゲームタイトル
- ジャンル、人数、プラットフォーム、開発状況
- キャッチコピー
- ストーリー
- ゲームシステム説明
- 特徴
- Steam・YouTubeなどの導線
- キービジュアルとスクリーンショット

### `members/*.md`で管理する内容

- 名前
- URL用ID
- 役割
- 短い紹介
- 詳細プロフィール
- 現在の担当
- プロフィール画像
- 画像の表示位置
- SNS・ポートフォリオ
- 関連作品

### `works/*.md`で管理する内容

- 作品名
- 公開年
- サムネイル
- 作品URL
- 担当メンバー
- 表示順
- 公開・非公開フラグ

作品を追加するときは、画像1点とMarkdownファイル1点を追加するだけで一覧に反映される形にする。

## 6. 画像管理の設計

### 基本ルール

- 表示に使用する主要画像は `src/assets/images` に配置する
- favicon、OGP、直接URLが必要なファイル、動画だけ `public` に置く
- ファイル名は半角英数字とハイフンに統一する
- 表示用画像には必ず代替テキストを設定する
- 同じ画像の重複ファイルは、参照先を統一してから整理する

例:

```text
daisho-key-visual.png
daisho-screenshot-01.jpg
member-eightaid.png
work-grandidier.gif
```

Astroの `<Image>` または `<Picture>` を利用し、表示サイズに応じた画像生成、遅延読み込み、レイアウトずれの防止を行う。`src` 内の画像はAstroで処理できるが、`public` 内の画像は原則として無加工で配信される。

公式資料:

- [Astro Images](https://docs.astro.build/en/guides/images/)
- [Astro Assets API](https://docs.astro.build/en/reference/modules/astro-assets/)

### 画像差し替え方法

通常は次のどちらかだけで済むようにする。

1. 同じファイル名・同じ用途の画像で上書きする
2. MarkdownまたはYAMLの `image:` を新しいファイル名へ変更する

### 動画の扱い

- 通常はYouTube埋め込みを優先する
- MP4を直接掲載する場合は `public/movies` に置く
- 現在存在する重複MP4は、実際に使う1ファイルへ統一する
- 自動再生は原則として使用しない

## 7. デザイン方針

テーマは「ダークファンタジー × エディトリアル × カード」にする。

### ビジュアル

- 黒、深い赤、生成りを基調にする
- キービジュアルを最初の画面で大きく見せる
- 現在の半透明カード表現は補助的な使用に減らす
- 見出しは物語性のある明朝系、本文は可読性の高いゴシック系にする
- カードの縁、番号、選択肢、罫線をモチーフとして使う
- 背景画像だけに頼らず、余白と文字組みで世界観を作る

### トップページ

1. キービジュアルとメインコピー
2. Steamへの主要CTA
3. 『代償少女』の概要
4. 作品の特徴
5. スクリーンショットギャラリー
6. PV
7. 制作メンバー
8. 最新情報・SNSへの導線
9. 問い合わせ

### 操作とアニメーション

- スクロール時の短いフェード・スライド
- ボタンやカードの控えめな反応
- ギャラリーの前後切り替えとサムネイル選択
- キーボード、タッチ操作に対応
- `prefers-reduced-motion` が有効な環境では動きを抑える

### デザイン決定方法

本実装に入る前に、既存素材を使用したトップページの方向案を3種類作成する。

- A: キービジュアル主役の映画的レイアウト
- B: カードと選択肢を強調したゲームUI的レイアウト
- C: 余白と文字組みを重視したエディトリアルレイアウト

比較後、選んだ方向を全ページへ展開する。

## 8. URL移行方針

現在のハッシュURLを通常URLへ変更する。

| 現在 | Astro移行後 |
|---|---|
| `/#/` | `/` |
| `/#/members` | `/members/` |
| `/#/members/eightaid` | `/members/eightaid/` |
| `/#/members/beniimo` | `/members/beniimo/` |
| `/#/special` | `/special/` |

過去に共有されたハッシュURLはトップページを表示できるため致命的にはならないが、必要であれば移行案内を追加する。

## 9. SEO・SNS表示

- `<html lang="ja">` を設定する
- ページごとにタイトルと説明文を設定する
- canonical URLを設定する
- OGP・X Card用のメタ情報を設定する
- サイト内容に合わせた `og.png` を用意する
- faviconを既存のアプリアイコンから整備する
- `sitemap.xml` と `robots.txt` を用意する
- 見出し階層と画像の代替テキストを整理する

OGP画像内の正式な文言は、最終デザイン確定後に確認してから採用する。誤った文字が含まれる画像は公開しない。

## 10. 実装フェーズ

### Phase 1: 移行前整理

- 現在の全ページ、文言、リンク、画像参照を一覧化
- 使用中・未使用・重複素材を分類
- 現状サイトの主要表示を記録
- 現在のGitHub Pages設定を確認

完了条件:

- 移行対象のコンテンツと素材が確定している
- 削除候補は記録するだけに留め、移行完了前には削除しない

### Phase 2: Astro基盤構築

- React + ViteからAstroへ依存関係を変更
- `astro.config.mjs` を作成
- 共通レイアウト、ヘッダー、フッターを実装
- コンテンツコレクションと入力スキーマを作成
- 現在の文言とメンバーデータを移行
- ファイルベースルーティングを作成

完了条件:

- 全ページが仮デザインで表示できる
- 文言がコンテンツファイルから読み込まれる
- `npm run build` が成功する

### Phase 3: デザイン方向の決定

- トップページの方向案を3案作成
- PCとスマートフォンの見え方を比較
- 採用案の色、文字、余白、カード、モーションを定義

完了条件:

- 採用するデザイン方向が1つに決まっている
- 実装用のデザイントークンが決まっている

### Phase 4: 本デザイン実装

- トップページを完成
- メンバー一覧・詳細を完成
- 特設ページを完成
- ギャラリーと動画表示を完成
- モバイルナビゲーションを実装
- CTAと問い合わせ導線を調整

完了条件:

- PCとスマートフォンで全コンテンツを利用できる
- 外部リンクが正しく開く
- キーボード操作が可能

### Phase 5: 画像・パフォーマンス・SEO

- 主要画像をAstroの画像処理へ移行
- 重複素材の参照を統一
- 画像サイズと読み込み優先度を調整
- OGP、favicon、サイトマップ、robots.txtを設定
- 不要なReact関連コードと依存関係を整理

完了条件:

- 画像による大きなレイアウトずれがない
- ページ固有のタイトルと説明が設定されている
- 不要な旧実装が残っていない

### Phase 6: 公開前確認

- 本番ビルド
- PC・スマートフォン表示確認
- 主要ブラウザでの確認
- リンク切れ確認
- 404ページ確認
- GitHub Pagesのリポジトリ配下ではなく、ルートURLで正しく動くことを確認
- 現行サイトとの差分を確認

完了条件:

- `npm run build` が成功する
- 公開を止める問題がない
- ユーザー確認が完了している

### Phase 7: GitHub Pagesへ公開

- GitHub ActionsのAstro向けワークフローへ更新
- `main` ブランチへ反映
- GitHub Actionsの完了を確認
- 公開URLで最終確認

完了条件:

- `https://daisho-project.com/` で新サイトが表示される
- `https://www.daisho-project.com/` からメインURLへ転送される
- 以後、`main` ブランチへの更新で自動公開される

## 11. 公開方式

### 独自ドメイン設定状況（2026-07-20完了）

- GitHubアカウントで `daisho-project.com` の所有確認済み
- GitHub PagesのCustom domainに `daisho-project.com` を登録済み
- Cloudflare DNSのAレコード4件を設定済み
- `www.daisho-project.com` のCNAMEを設定済み
- GitHub PagesのDNSチェック成功
- `Enforce HTTPS` 有効化済み
- `http://daisho-project.com` からHTTPSへの転送確認済み
- `www.daisho-project.com` から正規URLへの転送確認済み
- 正規URL `https://daisho-project.com/` の応答確認済み

### 採用する方式

現在の `EightAID/eightaid.github.io` リポジトリとGitHub Pagesをそのまま使用し、取得済みの独自ドメイン `daisho-project.com` を接続する。

正式な公開URLは次のルートドメインとする。

```text
https://daisho-project.com/
```

`www.daisho-project.com` もDNSへ登録し、`https://daisho-project.com/` へ転送する。Astroの設定では独自ドメインを `site` に指定し、`base` は設定しない。

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://daisho-project.com',
})
```

GitHub PagesはAstroの静的ビルド出力 `dist` を公開する。現在もGitHub Actionsの公開ワークフローが存在するため、Astro向けに内容を更新して引き継ぐ。

公式資料:

- [Deploy Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Deploy an Astro Site](https://docs.astro.build/en/guides/deploy/)

## 12. 公開までにユーザーが行う作業

### 必須作業

基本的に、新しいサービス登録や有料契約は不要。

初回公開時に、GitHubで次の設定だけ確認する。

1. GitHubで `EightAID/eightaid.github.io` を開く
2. `Settings` を開く
3. 左側の `Pages` を開く
4. `Build and deployment` の `Source` が `GitHub Actions` になっていることを確認する
5. `Custom domain` に `daisho-project.com` を設定する
6. `Enforce HTTPS` を有効にする
7. 公開後、GitHub Actionsの実行が成功したことを確認する

すでに現在のサイトがGitHub Pagesから公開されている場合、1〜4は設定済みである可能性が高い。

### Codexが実装時に対応できる作業

- Astroへの移行
- 文言・画像管理構造の作成
- デザインとレスポンシブ対応
- GitHub Actions設定の更新
- ビルド確認
- Gitへのコミット
- GitHubへのプッシュ
- 公開結果の確認
- 更新マニュアルの作成

コミットやプッシュは、実行前に対象変更を確認してから行う。

### ユーザーによる登録が不要なもの

- Astroのアカウント登録
- Astroの利用契約
- NetlifyまたはVercelの登録
- サーバー契約
- データベース契約
- YouTube埋め込み用APIキー
- GitHub Actions用の追加シークレット

現在の要件は静的サイトで完結するため、これらは不要。

### 独自ドメインの設定

`daisho-project.com` はCloudflare Registrarで取得済み。次の作業を行う。

1. GitHubアカウント側で `daisho-project.com` の所有権をTXTレコードで確認する
2. GitHubリポジトリのPages設定へ `daisho-project.com` を登録する
3. Cloudflare DNSへGitHub Pages用のAレコードを追加する
4. `www` のCNAMEを `EightAID.github.io` へ向ける
5. DNS反映後にGitHub PagesのHTTPSを有効化する
6. `daisho-project.com` と `www.daisho-project.com` の両方を確認する

DNSにはGitHub公式が案内する値を使用し、ワイルドカードレコードは作成しない。DNS変更前にGitHub Pages側へカスタムドメインを登録する。

Cloudflare DNSへ追加する公開用レコード:

| Type | Name | Content |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `EightAID.github.io` |

GitHubアカウントのドメイン所有確認で表示されるTXTレコードもCloudflare DNSへ追加し、所有確認が完了した後も削除せず残す。GitHub Pagesとの初回接続中は、Cloudflareのプロキシを無効（DNS only）にして検証する。

### 任意で必要になる作業

#### アクセス解析を導入する場合

Google Analyticsなどを利用する場合のみ、解析サービスへの登録と測定IDの発行が必要。

アクセス解析は今回の初期移行には含めず、必要になった段階で追加できる構造にする。

#### 問い合わせフォームを設置する場合

現在の `mailto:` リンクを維持する場合は登録不要。

Webフォームから送信できるようにする場合は、フォームサービスまたはサーバー側処理が別途必要。初期移行ではメールリンクを維持する。

## 13. 公開時に必要な情報

公開前に、次だけ確認する。

- GitHub Pagesの `Source` が `GitHub Actions` になっているか
- 公開前にユーザー自身で最終確認したいか、そのまま公開してよいか
- Google Analyticsなどのアクセス解析が必要か

公開URLは `https://daisho-project.com/`、正規URLは `www` なしで確定済み。アクセス解析を使わない場合、追加登録は不要。

## 14. 更新マニュアルに含める内容

実装完了時に `CONTENT_GUIDE.md` を追加し、次を画像なしでも理解できる手順として記載する。

- トップページの文言変更
- 『代償少女』特設ページの変更
- スクリーンショット追加・差し替え・並び替え
- メンバー追加・編集
- 過去作品追加・編集
- Steam、X、YouTubeリンクの変更
- ローカルでの表示確認
- GitHubへの反映と自動公開
- 入力ミスでビルドが失敗した場合の確認箇所

## 15. 受け入れ条件

次をすべて満たしたら移行完了とする。

- 現在の主要コンテンツと外部リンクが引き継がれている
- URLから `#` がなくなっている
- ページ文言の大半を `.astro` ファイルに触れず変更できる
- 画像差し替え時にコンポーネントの変更が不要
- 作品やメンバーをコンテンツファイルの追加で増やせる
- 入力漏れや不正なデータをビルド時に検出できる
- PCとスマートフォンでレイアウトが成立している
- キーボード操作と代替テキストに対応している
- OGP、favicon、タイトル、説明文が設定されている
- GitHub Pagesへの自動公開が動作している
- 更新手順が `CONTENT_GUIDE.md` に記載されている

## 16. 実装開始時の推奨順序

1. 現行サイトの内容を保持したままAstro基盤へ移行する
2. 文言と画像指定をコンテンツファイルへ分離する
3. 仮デザインの全ページをビルド可能にする
4. トップページのデザイン案を比較して方向を決める
5. 採用デザインを全ページへ展開する
6. 画像最適化、SEO、アクセシビリティを仕上げる
7. ユーザー確認後にGitHub Pagesへ公開する

この順序なら、見た目の刷新中も既存コンテンツを失わず、文言や画像を安全に調整できる。
