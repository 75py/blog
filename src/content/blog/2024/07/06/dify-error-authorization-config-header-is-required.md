---
title: 'DifyのHTTPリクエストで run failed: authorization config header is required エラーが出た時の対処法'
description: ''
pubDate: '2024-07-06'
updatedDate: '2024-07-14'
heroImage: '../../../../../images/categories/ai.png'
tags:
- 生成AI
- Dify
---

2024/7/14追記： 案外すぐ直せそうだったので修正してPR出した。  
https://github.com/langgenius/dify/pull/6040  
v0.6.13で修正済み。

---

以下のキャプチャのように、HTTPリクエストのBearerトークンを設定していたところ、2024/7/5から `run failed: authorization config header is required` というエラーが出るようになった。

![Difyの認証キー設定](./image1.png)

原因までは調べていないが、以下のように「カスタム」でヘッダーを設定することでエラーが解消した。

![修正後の設定](./image2.png)

issueはこれかな。
https://github.com/langgenius/dify/issues/6033
