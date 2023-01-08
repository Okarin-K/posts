---
title: fishシェルのインストール方法
slug: install-fish-shell
date: 2023-01-09 03:00
---

# fishシェルのインストール方法

会社の先輩から教えてもらってから使いやすくてずっと使ってるんですけど、
インストール方法で躓きました。

備忘録です。

## 環境

Ubuntu20.04

## How

fishシェルが入っているリポジトリを追加してインストールします。

```bash
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish
```

fishがインストールできているか確認する

```bash
fish -v
```

fishをデフォルトシェルにする。

Ubuntuはbashがデフォルトなので起動しなおしてもfishを開くように設定を変更する。

```bash
chsh

/usr/bin/fish
```

以上
