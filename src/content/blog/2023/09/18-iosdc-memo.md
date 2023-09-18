---
title: 'iOSDC 2023 感想メモ'
description: ''
pubDate: '2023-09-18'
heroImage: '../../../../images/categories/ios.png'
tags:
  - iOSDC
  - iOS
---

### タクシーアプリの多言語対応・ローカライズにおける課題と解決策 by h1d3mun3

https://fortee.jp/iosdc-japan-2023/proposal/b7f56538-0f47-41c2-8140-2aaf48dffd14

今の業務だとローカライズは特に考慮していないので、眺めた程度。  
個人で開発することになったら使う知識なのかな。でも最近新しいのが出てたような。  
→ String Catalogsだった。WWDCで言ってたやつだ。  
https://developer.apple.com/documentation/Xcode/localizing-and-varying-text-with-a-string-catalog  
String Catalogsについては、ざっと見た感じだと触れられてなさそうだけど、実際はどうなのかなぁ。

動画もちゃんと見たいところ。

### モーダルの遷移を理解する by 八十嶋祐樹

https://fortee.jp/iosdc-japan-2023/proposal/229fc10b-6d26-4688-b658-3b925ce25123

モーダルの遷移、ややこし過ぎでは……？

要動画確認

### Swift Packageを使った巨大な依存グラフのキャッシュ戦略 by giginet

https://fortee.jp/iosdc-japan-2023/proposal/ac02713c-84c6-404f-9405-95088a87cd8f

Bazelでビルドを高速化したという情報は以前見たことがあったが、その後メンテコストが重くなったとのこと。まぁそうだよね。。。  
色々理由は挙げているが、LINEで難しければ他所でも難しい可能性が高いだろう。

やはり標準＝Swift Package Manager(SPM)が最も良い選択か。。。  
ただし、標準機能だけだと難しい側面もあるとのこと。
- キャッシュ
  - DerivedDataに保存される
  - 100を超える依存関係のキャッシュには不適当
- 複数のxcodeprojからの利用が難しい

（逆に言うと、上記の問題さえなければ、SPMオンリーにできるのでは？）

LINEではScipioを使うことにしたとのこと。  
https://github.com/giginet/Scipio

Scipio
- SPMを利用してXCFrameworkを生成する
  - WWDC19で発表された形式
  - 従来のFrameworkに比べて、複数のプラットフォーム向けのバイナリを同時に配布できる
  - 実態はただのBundle
    - Info.plist
    - ios-arm64
      - MyFramework.framework
    - ios-arm64_x86_64-simulator
      - MyFramework.framework
  - なるほどなぁ
- Swift Packageを再配布可能な形に変換して扱える
- リモートキャッシュシステムもある（これ気になるな）
- Carthage
  - XCFrameworkのサポートには、ライブラリ作者がxcodeprojを設置する必要がある
  - メンテが止まっている
- VersionFileというビルドコンテキストを含むファイルを生成
  - 同一のものがあればキャッシュを使う仕組み
- Local Diskキャッシュ
  - ~/Library/Cacheに成果物を退避
  - ビルド時にVersionFileのハッシュから、キャッシュがあれば復元する
  - 複数のXcodeバージョン切り替え時や、ブランチの切り替え時に有用
- Remote Diskキャッシュ
  - Amazon S3
  - オンプレにできないのかな。社内サーバー的な
- （細かい話は流し読み）
- Scipioの利点
  - SwiftPM + Xcode をベースにしているので壊れづらい
  - SwiftPMがメンテされる限りは大丈夫そう
  - 辞めやすい
    - SwiftPM単独にすることもできる？
    - 部分的に使うこともできる？
- まぁ結局のところ、標準の手段で済むなら標準に乗っかるのが一番

結論、新規でアプリを作るならSPMを選択するべき。既存アプリも可能ならSPM一本に絞った方が安全。  


### Appleにおけるプライバシーの全容を把握する by akatsuki174

https://fortee.jp/iosdc-japan-2023/proposal/c9247098-377a-4288-be71-5e210d330042

- プライバシーは基本的人権
  - うーん、まぁ言いたいことが分からんでもないが。。。w
- プライバシー保護4原則
  - データの最小化
    - 必要な時に、必要な分だけ
  - オンデバイス処理
    - できるだけローカルで処理
  - 透明性と管理
    - 使用方法や共有先を明確にする
    - 自分の意思でデータを管理
  - 機密保持
- 許可を求める際の目的文字列はInfo.plistで設定する
  - App Storeで審査される。へー
  - 用途、使用方法を書く
  - 長すぎてもダメ
- 位置情報
  - 使用中のみ許可と常に許可がある
    - Androidと同じ
  - LocationButton
    - iOS15以上で使用可能
      - ズコー

続きはここから
