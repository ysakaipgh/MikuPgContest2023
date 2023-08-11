# 初音ミク「マジカルミライ 2023」プログラミング・コンテスト 公開リポジトリ版

- フレームワーク無しのHTML・CSS・JSだけで、どこまで作れるのかを挑戦
  - HTML 部分はテンプレートエンジンとして、 pug を採用
  - CSS 部分は SCSS を採用
  - JavaScript 部分は、 parcel でコンパイル前提にはなっているが、一応外部プラグインや TypeScript 等に頼らない物としている。
- コンテスト応募版とでは、 `chord.js` の中身が別物となっています。

### デモページ

- [コンテスト楽曲用](https://www.personal-dashboard.net/contents/miku-pg-contest-2023/)
  - [Youtube 限定公開URL（king妃jack躍 feat.初音ミク）](https://youtu.be/p2OlV8c9oZA)
  - [Youtube 限定公開URL（プレイヤーとしての機能紹介、デバッグ出力）](https://youtu.be/xvWR8w6c6sA)
- [ブレス・ユア・ブレス by 和田たけあき feat. 初音ミク](https://www.personal-dashboard.net/contents/miku-pg-contest-2023/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Da-Nf3QUFkOU)
- [グリーンライツ・セレナーデ by Omoi feat. 初音ミク](https://www.personal-dashboard.net/contents/miku-pg-contest-2023/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXSLhsjepelI)
- [愛されなくても君がいる by ピノキオピー feat. 初音ミク](https://www.personal-dashboard.net/contents/miku-pg-contest-2023/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DygY2qObZv24)

## 開発

### インストール

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行してください。

```sh
npm install
```

- インストール後に、以下作業を行ってください。
  - 「.env.sample」のファイルをコピーして、「.env」ファイルを作成する。
  - 以下、TextAliveの開発者情報のページで、アプリトークンを発行する。
    - [開発者情報](https://developer.textalive.jp/profile/)
  - 発行されたアプリトークンを、「.env」ファイルの「 `TOKEN=` 」の右側に記述する。
    - 例） `TOKEN=AbCdEFg1234567890`

### 起動

以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm run dev
```

### ビルド

以下のコマンドで `prod` 以下にビルド済みファイルが生成されます。

```sh
npm run build
```

### キャッシュクリア

```sh
npm run clean
```
