---
title: '記事ネタ：GitHubのPRコメントを一括取得してChatGPTで評価する'
description: ''
pubDate: '2023-09-03'
heroImage: '../../../../images/categories/programming.png'
tags:
  - GitHub
  - ChatGPT
  - OpenAI
  - AI
---

PRレビューコメントを一括取得して、メンバーごとにレビューコメントの評価をしたい。

イメージ
1. GitHubのAPIを使ってPRコメントを一括取得し、CSVファイルで出力する
2. 分析に必要なカラムだけを取り出す
3. ChatGPTで分析する

1はPythonのスクリプトで簡単にできた。今度記事にする。

3はChatGPT Plusの機能でできる。プロンプトに評価基準をどう表現するかが鍵になりそう。これは要調整。  
個人アカウントだと限界があるので、やるなら業務アカウントでやって、テックブログに書くのが良さそう。
