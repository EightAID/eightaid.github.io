# Portfolio Site

React + TypeScript + Vite + Tailwind CSS で作った、GitHub Pages向けポートフォリオです。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## デプロイ (GitHub Pages)

1. GitHub リポジトリの `Settings > Pages` を開く  
2. `Source` を `GitHub Actions` に設定  
3. `main` か `master` ブランチへ push  
4. `.github/workflows/deploy.yml` が実行され、自動デプロイ
