---
title: Denoのインストールをしてみる
slug: build-deno-environment
---

# Denoのインストールをしてみる

## なぜ？

- 使ってみたかったから
- node_modulesで容量使うの嫌だから

## 環境

- Windows11 + WSL2(Ubuntu20.04)

## インストール

ターミナルで以下のコマンドを実行する

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

ダウンロードが始まるので完了するまで待ちます。
完了後、出力にも記載されていますが、Denoの実行パスを **.bashrc** に保存してねと表示されるので言われたとおりにします。

**.bashrc**の最終行あたりに追記します。

```
# deno
export DENO_INSTALL="/home/okayama/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

**.bashrc**を更新したので開いているターミナルに反映させるため以下のコマンドを実行します。

```bash
source ~/.bashrc
```

denoのインストールが完了したのでバージョンを確認してみましょう。
以下のコマンドを実行します。

```bash
deno --version
```

以下のように出力されれば問題ありません。


```bash
deno 1.28.3 (release, x86_64-unknown-linux-gnu)
v8 10.9.194.5
typescript 4.8.3
```

完了です。

## まとめ

今までWindows環境で使っていたのでインストーラーを実行しない方法は苦手でしたが、これで少しは慣れた気がします。
deno日本語マニュアルを読んで手順通りにしただけですが分かりやすいドキュメントでとても助かりました。
私がドキュメントを書くときの参考にもなるのでとても良かったです。
これでdenoを使えるようになったので色々作ってみようかなー。

