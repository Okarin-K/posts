---
title: Express+MongoDBの環境構築
slug: setup-mongodb-in-express
date: 2023-01-03 22:02
---

# Express+MongoDB+TypeScript の環境構築

MongoDB を使おうと思って設定してたのですがちょくちょく詰まったりで調べたりしたのでそれをまとめます。

サンプルコードがいくつか書いていますが、可読性などは無視してます。
適宜、使いやすいように直して使いましょう。

## プロジェクトの初期設定

Node.js のプロジェクトを作成します。
TypeScript が使えるようにするための設定までです。

```bash
mkdir mongodb-sample

cd mongodb-sample

npm init -y

npm i typescript @types/node

npx tsc --init
```

@types/○○ はパッケージの型ファイルです。
入れないと import のときにパッケージが見つからないとエラーを吐くので入れましょう。
それに VSCode などでコード補完が効くようになります。

tsc コマンドの実行で tsconfig.json が作成されたはずなので以下の中身と入れ替えます。

超最低限のバックエンド用の tsconfig です。

```json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "commonjs",
        "moduleResolution": "node",
        "outDir": "./dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    },
    "include": ["./src/**/*.ts"]
}
```

## mongoose のインストール

MongoDB を扱うためのパッケージです。
注意する点は MongoDB 自体はインストールされません。

```bash
npm i mongoose @types/mongoose
```

## MongoDB のインストール

MongoDB を使う方法は 3 つあります。

-   MongoDB をローカルにインストールする
-   MongoDB の docker コンテナを使用する
-   クラウドの MongoDB Atlas を使用する

どれでもいいのですが Docker が使えればそれが楽なので Docker コンテナを使います。

```yaml:docker-compose.yaml
version: '3'
    services:
        mongo:
            container_name: mongo
            image: mongo
            restart: always
            environment:
                MONGO_INITDB_ROOT_USERNAME: okarin
                MONGO_INITDB_ROOT_PASSWORD: password
            ports:
                - 27017:27017
            volumes:
                - ./mongo:/data/db
                - ./mongo:/data/configdb
```

docker-compose.yaml から Docker コンテナを起動します。

```bash
docker-compose up
```

## express の設定

必要なパッケージをインストールします。

```bash
npm i express @types/express
```

express サーバーを起動するファイルを作ります。

```typescript:server.ts
import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Seccess');
});

app.listen(5000, () => {
    console.log('Listening to server...');
});
```

## MongoDB との接続処理を書く

さて、ここが本題です。

一番詰まりました。。。

```typescript:server.ts
import express from 'express';
import mongoose from 'mongoose';

// mongodbのアドレスを指定します
// 認証のためにユーザー名とパスワードを指定してます。
// 変数でmongoDBを作ってmongoose.connectに入れてますが直接入れてもよさそうです。
const mongoDB = 'mongodb://okarin:password@127.0.0.1/';
mongoose.connect(mongoDB);

// MongoDBの処理でNode.jsのグローバルライブラリの非同期処理を使うようにする
mongoose.Promise = global.Promise;

const db = mongoose.connection;

// MongoDB関連の処理で例外が出た時に補足するためのイベントハンドラー
db.on('catch', console.error.bind(console, 'Mongo DB connection error.'));

const app = express();

app.get('/', (req, res, next) => {
    res.send('Seccess');
});

app.listen(5000, () => {
    console.log('Listening to server...');
});
```

## MongoDB のスキーマを作る

接続処理はできたのであとはデータを格納する対象のスキーマを作りましょう。
RDB 風に言うとテーブルですね。

コードが長いので省略してます。
適宜読み替えてください。
前後の一行だけ残してます。

```typescript
db.on('catch', console.error.bind(console, 'Mongo DB connection error.'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    createdAt: Date,
});
const user = mongoose.model('UserModel', userSchema);

const app = express();
```

## データを追加、取得してみる

スキーマを作ったのでまずは取得できるか試してみましょう。

```typescript
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    createdAt: Date,
});

app.get('/', (req, res, next) => {
    const user = mongoose.model('UserModel', userSchema);

    user.find()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });

    res.send('success');
});
```

では実行してためしてみましょう。

TypeScript を使っているので、まずはコンパイルします。

```bash
npx tsc
```

正常終了すれば dist フォルダが生成されているはずです。

ではサーバーを起動します。

```bash
node ./dist/server.js
```

正常終了すれば、console.log に記載した内容がコンソールに表示されるはずです。

では、エンドポイントにアクセスしてみましょう。

```bash
curl http://localhost:3000/
```

問題なければコンソールに空の配列が表示されるはずです。

では、次にデータを追加してみます。

結構雑に、エンドポイントアクセスで固定値を入れてみます。

本当なら req.body から受け取った情報を入れるべきですね。

```
app.post('/', (req, res, next) => {
    user.insertMany({
        id: 'test',
        name: 'okarin',
        createdAt: new Date(),
    });

    res.send('success');
});
```

ではサーバーを起動して実行してみましょう。

```bash
curl http://localhost:3000/
```

正常に終わればデータが追加されているはずです。

取得のエンドポイントを実行してさきほど追加したデータがあるか見てみます。

```bash
curl -X POST http://localhost:3000/
```

問題なければ下みたいに出力されるはずです。

```bash
[
  {
    _id: new ObjectId("63b425e76883bf293d4458f7"),
    id: 'test',
    name: 'okarin',
    createdAt: 2023-01-03T12:56:07.998Z,
    __v: 0
  }
]
```

## おわりに

いつも RDB ばっかり使っているので MongoDB の設定に躓くところは多かったのですがやること自体は単純な気がしました。
でも、環境構築自体が面倒な方は Atlas とかのクラウドサービスを使った方がよいかもです。
もしくは Firebase の FireStore を使ってもいいかもですね。同じ NoSQL ですし。
