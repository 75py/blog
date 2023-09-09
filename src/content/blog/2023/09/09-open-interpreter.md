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
→ Macbook Proで色々試してみたものの、不安定で急にプロセスが落ちてしまったり、会話にならなかったり。  
実用的かというと微妙なラインか。あるいは、自分の環境の問題かもしれない。

### -yオプションについて

紹介記事だと、 `-y` オプション付きで紹介されていることがある。

```bash
interpreter -y
```

`-y` オプションは、 `提案したコードを実行していい？ (y/n)` の回答を自動的にyesで先に進めるもの。  
一見便利だが、特にGPT-4以外の提案するコードは必ずしも期待するものではない可能性があるため、基本的には自分でコードを確認してから先に進めた方が良いように思う。  
ローカルで実行する場合は、ローカルの環境を壊してしまう可能性もあるので要注意。  
詳細はREADMEの [Safety Notice](https://github.com/KillianLucas/open-interpreter/#safety-notice) を参照。

基本的には、Google Colabなどで使うべきなんだろう。後日試してみるつもり。

### まとめ

まだ万人向けのツールではないな、という感想。  
大きな可能性は感じるし、今後流行る予感はするのでもう少し追っていきたい。
