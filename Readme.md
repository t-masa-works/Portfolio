# Portfolio: System: Override

AIスキルと15年の介護現場経験を融合させ、従来の「未経験」という評価基準を上書き（Override）するフロントエンド開発者のポートフォリオサイトです。

## 🌐 公開URL
(ここにGitHub PagesのURLを記述してください)

## ⚡ 主な実装機能と技術的アピールポイント

1. **AI-Driven Coding（動画アピール）**
   - AI（Gemini等）と対話し、本サイトのコンポーネントを爆速で組み上げる「AI協業開発」のプロセスを動画化して掲載。

2. **Motion & Interaction（軽量化への配慮）**
   - 透過動画に頼らず、背景透過PNG素材をCSSアニメーションで制御。サイトのパフォーマンス（データ軽量化）とリッチな視覚効果を両立。

3. **Commercial AI Creative（Before/Afterスライダー）**
   - Adobe Fireflyで生成した高クオリティなガジェットアセットを、Photoshopで商用LPのメインビジュアルへとデザイン・加工。ユーザーが直感的に比較できるスライダーUIを自作。

4. **Care-Driven UX（アクセシビリティ・アシストモード）**
   - 15年の介護現場経験を技術へ昇華。高齢者や視覚過敏のユーザーに配慮し、ボタン一つでコントラストと文字サイズを最適化する「Assist Mode（アクセシビリティ切り替え機能）」をJavaScriptで実装。

## 🛡️ セキュリティに関する配慮
お問い合わせフォーム（Contact）には外部サービス「SSGForm」を使用しています。フロントエンド環境（GitHub Pages）の特性上、エンドポイントURLがコード上に公開されますが、SSGFormの管理画面側にて**「ドメイン制限」**を設定し、本ドメイン以外からの不正なAPIリクエスト（スパム送信等）を完全に防止する実務レベルのセキュリティ対策を施しています。

## 🛠️ 使用技術
- HTML5 / CSS3 (アニメーション、Flexbox、Gridレイアウト)
- JavaScript (Vanilla JS / Intersection Observerによる動的制御)
- Adobe Photoshop / Adobe Firefly