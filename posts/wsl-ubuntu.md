---
title: WSL+Ubuntuの環境設定
slug: wsl-ubuntu
date: 2022-12-29 02:37
---

WSL+Ubuntu を入れたので環境構築です。
新しく作り直したんですが、何入れてたっけ？で忘れてたので次回のための対策です。
OS に依存してるような設定はほぼやらないようにしてるのでソフトウェアのインストールとかアプリケーションの設定くらいなのでやることは多くないけれども記憶しておくのは辛い。

デスクトップとノートでそれぞれで使ってるし設定を統一したい目的もあります。

では、本題です。

## 環境

WSL2+Ubuntu20.04

## インストール

### node.js の環境を整える

volta をインストール

```bash
curl https://get.volta.sh | bash
```

参考: https://docs.volta.sh/guide/getting-started

volta をシェルに反映させるため再起動のコマンドを実行する

```bash
exec $SHELL -l
```

volta のコマンドで node.js をインストールする

```ba環境
volta install node

or

volta install node@14
```

### vim をインストールする

インストールのコマンドを実行する

```bash
sudo apt install vim
```

.vimrc を作って中身を書く

```bash
touch ~/.vimrc
```

中身

https://github.com/Okarin-K/dotfiles/blob/main/.vimrc

## Git の config ファイルの設定を追加

https://sazanamin.hatenablog.jp/entry/2021/11/03/221557

## Github に SSH 接続のための公開キーを登録する

https://sazanamin.hatenablog.jp/entry/2022/06/22/191712
