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

deploy時にAllUserにinvokerが割あたっており誰からでもリクエストできてしまうので権限を削除する。

gen1

```
gcloud functions remove-iam-policy-binding helloWorld \
 --member="allUsers" \
 --role="roles/cloudfunctions.invoker"
```

認証後gcloudでログインしているアカウントでリクエストする

```
curl -X GET \
> -H "Authorization: bearer $(gcloud auth print-identity-token)" \
> https://us-central1-ankomochiii.cloudfunctions.net/helloWorld
```

### 秘密キーを使う
### OIDCを使う
## Emulatorで単体テストを実行する
## GithubActionsでOIDCを使ってデプロイする
