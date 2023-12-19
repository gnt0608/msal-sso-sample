<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col :cols="2">
          <v-btn @click="onClickSignIn"> Login </v-btn>
        </v-col>
        <v-col :cols="2">
          <v-btn @click="onClickSignOut"> Logout </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-card v-if="state.signedIn">
      <v-container>
        <v-row>
          <v-col :cols="2"> User:</v-col><v-col :cols="10"> {{ state.userName }} </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12">
            <v-textarea
              label="Access Token"
              rows="2"
              :model-value="state.accessToken"
              @click:appendInner="copyBtn(state.accessToken)"
              append-inner-icon="mdi-content-copy"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12">
            <v-textarea
              label="ID Token"
              rows="2"
              :model-value="state.idToken"
              @click:appendInner="copyBtn(state.idToken)"
              append-inner-icon="mdi-content-copy"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-divider />
    <json-viewer :value="tokenResponse" :expand-depth="5" copyable boxed sort></json-viewer>
  </v-container>
</template>
<script lang="ts" setup>

const { $login, $handleRedirect, $acquireToken, $logout } = useNuxtApp()

let state = reactive({
  signedIn: false,
  userName: "",
  apiResponse: "",
  accessToken: "",
  idToken: "",
})

let tokenResponse = ref({})

onMounted(async () => {
  let response = await $handleRedirect()

  let responseAcquireToken = await $acquireToken(["User.Read"])
  if (responseAcquireToken && responseAcquireToken.account) {
    console.log(responseAcquireToken)
    state.signedIn = true
    state.accessToken = responseAcquireToken.accessToken
    state.idToken = responseAcquireToken.idToken
    state.userName = responseAcquireToken.account.username
    tokenResponse.value = responseAcquireToken
  }
})

function onClickSignIn() {
  $login({ scopes: ["User.Read", "User.ReadBasic.All", "User.ReadWrite"] })
}

const onClickSignOut = () => {
  $logout()
  state.signedIn = false
}

function copyBtn(stringText: string) {
  navigator.clipboard.writeText(stringText)
}
</script>
