---
title: 'textlintで文章を校正する'
description: ''
pubDate: '2023-09-23'
heroImage: '../../../../images/categories/programming.png'
tags:
  - textlint
---

textlintを使って、文章を校正するためのメモ。  
このブログはAstroを使っていて、記事はMarkdownで書いているので相性が良い。

### textlintのインストール

```sh
npm install --save-dev textlint
```

### 日本語用ルールの追加

```sh
npm install --save-dev textlint-rule-preset-japanese textlint-rule-preset-ja-technical-writing
```

含まれているルールはそれぞれのREADMEに書かれている。
- https://github.com/textlint-ja/textlint-rule-preset-japanese
- https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing

### その他のルール

- textlint-rule-ng-word：NGワードをチェックする（企業ブログで、社内用語をNGにしておくと良さそう）
- textlint-rule-terminology：用語の正しい表記をチェックする（Javascript → JavaScriptなど）
- textlint-rule-date-weekday-mismatch：日付と曜日の不一致をチェックする
- textlint-rule-no-todo：TODOが残っていないかチェックする
- textlint-rule-abbr-within-parentheses：OSS（Open Source Software）→ Open Source Software(OSS)

### textlintの初期化

```sh
npx textlint --init
```

.textlintrc.jsonが作成される。

### textlintの実行

```sh
npx textlint src/content/blog/2023/09/23-textlint.md
```


