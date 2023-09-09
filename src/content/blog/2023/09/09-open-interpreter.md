---
title: 'Open Interpreterの体験がすごく良い（けどGPT-4 APIが高い）'
description: ''
pubDate: '2023-09-09'
---

### Open Interpreterとは

- https://github.com/KillianLucas/open-interpreter
- [Open Interpreter - 自然言語でコーディングを実現するオープンソースツール](https://note.com/masia02/n/n630d091c4a02)
- [OpenInterpreter / ついにAIがガチのアシスタントに!これは凄い、というか凄すぎる](https://note.com/shi3zblog/n/n7eaba88ffe4a)

これでインストールして
```bash
pip install open-interpreter
```

```bash
interpreter
```

で実行するだけ。OpenAIのAPIキーを入力すれば、デフォルトだとGPT-4のAPIで応答してくれる。

### 使用感

例えば、「この記事の要約をして。 https://〜」というのをやってみると、以下のような提案をしてくれる。

1. pip installで必要なパッケージをインストール
2. requestsでデータを取ってくる
3. Beautiful SoupでHTMLをパース
4. gensimで要約する

途中でエラーになった場合、エラーメッセージを基に解決案も提示して実行してくれる。  
体験としてはすごく良い。

### コストが高い

GPT-4のAPIはやっぱり料金が高い。

しかし、例えば、pip installでエラーが出た場合、エラーメッセージを全てGPT-4が読み込む必要がある。つまり、プロンプトがどんどん伸びていき、APIの利用料金が跳ね上がっていく。  
先ほどの例で数分使っただけで$2を超えてしまった。

### GPT-3.5を使う

```bash
interpreter --fast
```

`--fast` でGPT-3.5に切り替えられるが、GPT-4と比較すると、期待する応答は返ってこないことが多い。

### Code-Llamaを使う
APIキーを入力せずenterを押すと、Code-Llamaを自動でインストールしてくれる。  
GPT-3.5より精度の高いやり取りができるならこちらを利用すると良いのかも。  
→ Macbook Proで色々試してみたものの、不安定で急にプロセスが落ちてしまったり、会話にならなかったり。GPT-4ほどの精度がないのは間違いないので、実用的かというと微妙なラインか。

### まとめ

まだ万人向けのツールではないな、という感想。  
大きな可能性は感じるし、今後流行る予感はするのでもう少し追っていきたい。

