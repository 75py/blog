---
title: '積ん読：プロと読み解くモバイル最前線～アプリを支える最新技術～'
description: ''
pubDate: '2023-08-27'
updatedDate: '2023-08-29'
---

### 本の情報

- [プロと読み解くモバイル最前線～アプリを支える最新技術～](https://techbooster.booth.pm/items/4428455)
- TechBooster
- 2022-12-31版

### おすすめ度

todo

### 読書メモ

- Gradle Version Catalog
  - 便利だよね
  - libs.bundlesでまとめて定義できるのがとても良い
  - Version Catalog自体を公開することもできる。へー
    - androidxとか公開してないのかな
    - KMPもバージョン縛りがあったりするので便利そうではある
    - メンテ大変か・・・
- Themed app icons
  - ランチャーアイコン野色をユーザーの好みに合わせて切り替える仕組み
    - 個人アプリなら良いけど、業務だと難しいかな・・・ブランドイメージってあるし
    - 結局デザイン次第か
  - monochromeを設定するだけ
- Circuit
  - Slackが公開している
  - https://slackhq.github.io/circuit/
  > Circuit is a simple, lightweight, and extensible framework for building Kotlin applications that’s Compose from the ground up.
  - 考え方
    - 画面をScreenと呼ぶ
    - Screenには対応するPresenterとUIのペアが1つ存在する
    - PresenterとUIは直接参照しない
      - Presenterはstateを公開する
      - UIはeventを発火する
      - →単方向データフロー（UDF）を実現
    - PresenterとUIのペアをCircuit（回路）と呼ぶ
      - 複数の回路を組み合わせてアプリを構築する
  - （次はここから p29）


