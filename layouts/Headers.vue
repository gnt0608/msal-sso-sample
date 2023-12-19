<template>
  <v-app-bar app color="primary" dark clippedLeft>
    <v-toolbar-title class="ml-3"></v-toolbar-title>
    <div class="d-flex align-center">
      <router-link to="/"> </router-link>
    </div>

    <v-spacer> </v-spacer>
    <v-toolbar-title class="ml-3"> MSAL Sample </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup lang="ts">
let tab = ref("")
onMounted(() => {})
</script>
