---
title: 'AstroでOGP画像を作成する際の参考情報'
description: ''
pubDate: '2023-09-16'
heroImage: '../../../../images/categories/programming.png'
tags:
  - Astro
---

Astroのブログで、Integrationsを使ってOGP画像を作成するようにした。

全て解説する記事を書こうと思ったが、他にやりたいことがたくさんあるので断念。参考にしたURLのメモだけと差分だけ残しておく。

### 作成したOGP画像
![](https://www.nagopy.com/blog/2023/09/16-astro-ogp-image-tips/ogp.png)

### 差分

https://github.com/75py/blog/compare/5151a6a47ae4ed3908ee6f1967ef9c569b256496..be5f4dbea4eafe00f2c80fedf989dcfd6a664de0

### メモ

#### 公式ドキュメント

- [Server Endpoints (API Routes)](https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes)
  - 今回は、ブログ記事のURLの後ろに/opg.pngを付けるとOGP画像を返すようにした。
- [Astro Integration API](https://docs.astro.build/en/reference/integrations-reference/)  
  - integrationを自作する場合は、`astro:build:generated` を使うと良さそう。
  - 途中までこちらを使って実装するつもりだったが、src/contents配下のMarkdownファイルで設定した変数（画像パス）がどうしても取得できなかったので諦めた。

#### satori

[satori](https://github.com/vercel/satori) はHTML/CSSをSVGに変換するライブラリ。  
OGP画像作成で検索するとかなりの確率で利用されている。今回も使ってみた。

#### sharp

[sharp](https://github.com/lovell/sharp) は画像処理ライブラリ。

今回はWebP→PNG使用した。  
satoriがWebPをサポートしておらず、WebPのまま表示しようとすると `Unsupported image type: unknown` のエラーになってしまうため。
https://github.com/vercel/satori/blob/c47e1a91b80887de22c01a5e0fac350b4978aa1d/src/handler/image.ts#L136

#### resvg-js

[resvg-js](https://github.com/yisibl/resvg-js) はSVGをPNGに変換するライブラリ。

#### フォント

[Noto Sans Japanese - Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

satoriではフォントを指定する必要がある。上記フォントはOFL1.1でライセンスされているので、利用しやすい。

#### 参考記事

- [ブログ各記事の OG 画像を作った](https://www.codingfeline.com/2023/08/26/vitepress-ogp/)
  - VitePressだったのでそのままは使えなかったが、画像作成部分はほとんど同じ流れを採用させてもらった
- [HTML/CSS を SVG に変換する Vercel 製のパッケージ「satori」を試してみる](https://zenn.dev/kou_pg_0131/articles/satori-usage)
- [satoriを使ってJSXからOGP画像を作成してみる](https://zenn.dev/spacemarket/articles/6af6864298e6c8)
- [サイトのOGP画像を自動生成する](https://zenn.dev/panda_program/articles/generate-og-image)
  - canvasを利用する例。今回は見送った。
- [Astroで理想のサイトマップを自作する](https://shinobiworks.com/blog/641/)
  - AstroのIntegrationsを使っている例。
- [Astroでsatoriを使ったOG画像の自動生成を実装する](https://blog.70-10.net/posts/satori-og-image/)
  - 最終的に、画像作成の流れで一番参考にした記事。
