# 検証したいこと
## nodeのランタイムを10から18にする

package.jsonを下記に更新したら行ける予定

```
  "engines": {
    "node": "18"
  },
  ...
  "dependencies": {
    "firebase-admin": "^11.11.1",
    "firebase-functions": "^4.5.0"
  },
```
## service accountでアクセスする
### 秘密キーを使う
### OIDCを使う
## Emulatorで単体テストを実行する
## GithubActionsでOIDCを使ってデプロイする
