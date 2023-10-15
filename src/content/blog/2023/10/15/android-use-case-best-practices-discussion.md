---
title: ChatGPTでRedditの議論を要約して思うこと（AndroidのUse Case Best Practicesを例に）
description: ''
pubDate: 2023-10-15
heroImage: ../../../../../images/categories/ai.png
tags:
  - ChatGPT
  - OpenAI
  - AI
  - Android
---

[AndroidDagashi](https://androiddagashi.github.io/issue/297-2023-10-15/) で取り上げられた [I still find it wild that one of the "best practices" in Android Dev is to have every usecase to only has 1 public method. Am I the only one?](https://www.reddit.com/r/androiddev/comments/171uzlt/i_still_find_it_wild_that_one_of_the_best/) の議論をChatGPTで要約すると以下のようになる。

### ChatGPTによる要約

> このRedditの議論は、Android開発における"ベストプラクティス"とされるuse caseの実装方法についてのものです。議論者たちは、各use caseが1つのpublic methodだけを持つべきというルールに賛否が分かれていました。賛成派は、このルールが単一責任の原則を促進し、関心の分離を助けると主張しています。一方で、反対派は、このルールがコードの断片化や依存性注入の複雑化をもたらし、開発者の生産性やテストの容易さを低下させると主張しています。また、議論者の中には、このルールがJavaの制約から来ているのではないかと疑問を投げかける者や、use caseの実装方法はプロジェクトの規模や複雑さによって柔軟に変えるべきだと提案する者もいました。

> 賛成の意見:
> 1. 単一責任の原則を促進: 各use caseに1つのpublic methodだけを持たせることで、単一責任の原則を支持し、コードの整理と保守を助ける。
> 2. 関心の分離: use caseを1つの機能に限定することで、ビジネスロジックとUIの関心を明確に分離できる。
> 3. インターフェイスの分離原則のサポート: use caseに1つの関数だけを持たせることで、依存関係を単純化し、特定の関数にだけ依存することができる。
> 4. テストの容易さ: use caseが1つの機能だけを持つことで、テストを書きやすくし、特定の機能に焦点を当てることができる。
>
> 反対の意見:
> 1. コードの断片化: 1つのuse caseに1つのpublic methodだけを持たせるルールは、コードを多くの小さなクラスに断片化し、コードベースのナビゲーションを困難にする。
> 2. 依存性注入の複雑化: 1画面に複数のuse caseが必要な場合、依存性注入が複雑になり、管理が困難になる可能性がある。
> 3. 開発者の生産性の低下: 多くの小さなuse caseクラスを作成することは、開発者の生産性を低下させる可能性があり、特に新しいメンテナーにとってはプロダクティビティが低下する。
> 4. 過度の抽象化: いくつかの議論者は、このルールが過度の抽象化をもたらし、Javaの制約から来ているのではないかと指摘している。
> 5. プロジェクトの規模や複雑さに応じた柔軟なアプローチの必要性: プロジェクトの規模や複雑さに応じて、use caseの実装方法を柔軟に変更する必要があるという意見がある。

なるほど。わかりやすいし、ざっと読んだ限りではおおよその議論を把握できる。

### 感想

英語を読めないことによるディスアドバンテージは年々下がっていると感じる（ゼロになることはないだろうが、かつてほどの壁は感じない）。  
業務をこなす上では要約を読めば十分だと思う。  
一方で、生の議論を読めば出てくるこれ
> Don't let your code be consumed by the architecture dogma.

あるいはこれ
> don't blindly follow anything just because it's "the best practice". Understand what's in it for you and use your judgement.

のような「なんだか心に響く一文」を目にせず終わってしまうのは、勿体なくも感じてしまう。
