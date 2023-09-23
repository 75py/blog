---
title: 'No loader is configured for ".node" files: node_modules/@resvg/resvg-js-darwin-arm64/resvgjs.darwin-arm64.node'
description: ''
pubDate: '2023-09-23'
heroImage: '../../../../images/categories/programming.png'
tags:
  - Node
  - Astro
---

Macで開発中、あるタイミングから `astro dev` で以下のエラーメッセージが出力されるようになった。

```
✘ [ERROR] No loader is configured for ".node" files: node_modules/@resvg/resvg-js-darwin-arm64/resvgjs.darwin-arm64.node

    node_modules/@resvg/resvg-js/js-binding.js:1:2594:
      1 │ ...uire("./resvgjs.darwin-arm64.node"):nativeBinding=require("@resvg/resvg-js-darwin-arm64")}catch(e){loadError=e}break;default:throw new Error(`Unsu...
        ╵                                                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

→ astro.config.mjs に以下を追加することで解決した。

```diff
export default defineConfig({
    ...
+ 	vite: {
+ 		optimizeDeps: {
+ 			exclude: ['@resvg/resvg-js']
+ 		}
+ 	},
});
```

参考にしたページ：[satoriを使ったAstroのOGP画像生成メモ | Marginalia](https://blog.lacolaco.net/2023/06/astro-satori-og-image-generation/)
