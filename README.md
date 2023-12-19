# msal-sso-sample

Msal SSO Sample for Nuxt3

## 起動方法

以下に示す環境変数設定ののち、以下コマンドを実行すう

```
cd msal-sso-sample
npm install
npm run dev
```

## 環境変数設定

| 変数名                | 設定概要                           | デフォルト値           |
| --------------------- | ---------------------------------- | ---------------------- |
| clientId              | Azure EntraID に記載の Client ID   |                        |
| tenantId              | Azure Tenant ID                    |                        |
| redirectUri           | ログイン成功後リダイレクト用 URL   | http://localhost:3000/ |
| postLogoutRedirectUri | ログアウト成功後リダイレクト用 URL | http://localhost:3000/ |
