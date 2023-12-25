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

### GCPから呼び出す

権限の付与

RECEIVING_SERVICE = 呼び出されるリソース名
CALLING_SERVICE_IDENTITY = 呼び出す側のサービスアカウント

```
gcloud run services add-iam-policy-binding RECEIVING_SERVICE \
  --member='serviceAccount:CALLING_SERVICE_IDENTITY' \
  --role='roles/run.invoker'
```

### AWSから呼び出す
#### OIDCを使う

## GithubActionsでOIDCを使ってデプロイする
