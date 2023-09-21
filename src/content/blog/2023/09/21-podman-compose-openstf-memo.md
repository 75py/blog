---
title: 'OpenSTFをMac＋podman-composeで動かすメモ（失敗）'
description: ''
pubDate: '2023-09-21'
heroImage: '../../../../images/categories/programming.png'
tags:
  - Podman
  - OpenSTF
  - Android
---

Docker Desktopの代わりにPodman Desktopを使いたい。ということで、一番やりたいOpenSTFにトライしてみた。

docker-compose.yml  
https://github.com/DeviceFarmer/stf/blob/master/docker-compose.yaml

Macで動かす場合、adbはホスト側のものを使う必要がある。

ただ、adbの部分をいじった上でpodman-compose upしても、localhost:7100からレスポンスが返ってこない。  
ログを見た感じ、rethinkdbの初期化までは動いているが、その後の処理が動いていなさそう？

すごく古いパージョン（具体的には openstf/stf:latest）なら localhost:7100 で画面が開いた。どっかのバージョンで変わったのかな。  
ただ、どっちにしろホスト側のadbを使う部分がうまくいかず。adb接続のところでエラーになってる。

うーん、諦めてnpm installからのstf localの方が早そうだな……。
