import { AuthenticationResult, InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser"

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const clientId = runtimeConfig.public.clientId
  const tenantId = runtimeConfig.public.tenantId
  const msalConfig = {
    auth: {
      clientId: clientId,
      authority: "https://login.microsoftonline.com/" + tenantId,
      redirectUri: runtimeConfig.public.redirectUri,
      postLogoutRedirectUri: runtimeConfig.public.postLogoutRedirectUri,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  }

  const msal = new PublicClientApplication(msalConfig)

  let accessToken = ""
  await msal.initialize()

  return {
    provide: {
      login: async (scopes: string[]) => {
        msal.loginRedirect({ scopes: ["User.Read", "User.ReadBasic.All", "User.ReadWrite"] })
      },
      handleRedirect: async () => {
        let response = await msal.handleRedirectPromise().catch((error: any) => {
          console.error(error)
        })

        return response
      },
      acquireToken: async (scopes: string[]): Promise<AuthenticationResult | null> => {
        const accounts = msal.getAllAccounts()
        console.log(accounts)

        if (accounts.length >= 0) {
          const account = accounts[0]
          const silentRequest = {
            scopes: scopes,
            account: account,
            forceRefresh: false,
          }
          return msal
            .acquireTokenSilent(silentRequest)
            .then((response: any) => {
              accessToken = response.accessToken
              return response
            })
            .catch((error: any) => {
              if (error instanceof InteractionRequiredAuthError) {
                msal.acquireTokenRedirect(silentRequest)
              }
              return Promise.resolve(null)
            })
        }
        return Promise.reject(null)
      },
      logout: () => {
        msal.logoutRedirect()
      },
    },
  }
})
