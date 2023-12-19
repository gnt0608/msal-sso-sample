<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-container fluid class="h-100">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import Header from "./Headers.vue"
</script>
