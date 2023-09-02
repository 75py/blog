---
title: '積ん読：プロと読み解くモバイル最前線～アプリを支える最新技術～'
description: ''
pubDate: '2023-08-27'
updatedDate: '2023-09-02'
---

### 本の情報

- [プロと読み解くモバイル最前線～アプリを支える最新技術～](https://techbooster.booth.pm/items/4428455)
- TechBooster
- 2022-12-31版

### おすすめ度

目次の中で興味がある章が1つ以上あるなら買いだと思う。

### 読書メモ

- Gradle Version Catalog
  - 便利だよね
  - libs.bundlesでまとめて定義できるのがとても良い
  - Version Catalog自体を公開することもできる。へー
    - androidxとか公開してないのかな
    - KMPもバージョン縛りがあったりするので便利そうではある
    - メンテ大変か・・・
- Themed app icons
  - ランチャーアイコンの色をユーザーの好みに合わせて切り替える仕組み
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
  - アイディアとしては面白いけど、実務で使うとなると壁がありそう
    - サンプルから外れた複雑なことをしようとするとどうなるか
    - 学習コスト（自分単体ではなく、チームとして考えたときに難しいかもしれない）
- Android NDK
  - RustやWebAssemblyの話がちらほら
  - 今のところ関心が高くないのでスルー
- Modifiers 101
  > Jetpack Composeでは複数のコンポーザブルを組み合わせ、ひとつの役割を担うUI要素をコンポーネントと呼んでいます。コンポーネントはActivityやFragmentに直接紐づくことなく、自分自身で状態を持たない（ステートレスであるべき）と説明しています。 
  - UI表示にかかわる状態を上位コンポーネントに与えてもらう、依存する考え方を状態ホイスティング（State Hoisting）と呼ぶ
    - hoistingは「巻き上げる」という意味
- LazyLayoutでオリジナルのレイアウトを作る
  - 拡張予定があるならとても参考になると思う
  - 今のところその予定はないので斜め読み
  - ただ、オリジナルを作る予定がなくてもある程度仕組みを知っておくと良さそうではある
- Swiftマクロ入門
  - Cのマクロみたいなものではなく、コンパイラによる型チェックが行われるらしい
    - Rustのマクロは、プログラムのASTを操作する機能。へー
  - https://swift-ast-explorer.com/
  - Xcode15を使うことになったら本格的に利用することになる、かなぁ
- WebKitを今風に扱いたい！
  - Cookie周りの操作でConcurrencyが使える
  - 現時点では、WKWebViewは従来通りUIViewController上で表示した方が開発・保守のコスパは良いとのこと
- Android13の通知
  - Notification Runtime Permission
    - これ利用者としては鬱陶しいだけな気がするんだけどなぁ・・・
  - Foreground Service
    - ここもちょっと変わってる
    - Foreground Service Task Managerから停止することができる。そしてそれをアプリ側に通知する仕組みはない
      - 業務アプリでもし使ってたら大変だろうな・・・
      - 自分のツール系アプリは、まぁいいだろう。自分で止めたんだし。データが壊れるようなものでもないし
    - 長時間実行していると、ユーザーに終了を提案する通知を出す
      - 見たことあったかな・・・
      - これも業務アプリだと大変そう
- Slot APIs
  - まぁ知ってたのでスキップ
