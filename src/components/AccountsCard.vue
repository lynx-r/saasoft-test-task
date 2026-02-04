<script setup lang="ts">
import { Card } from "primevue";
import AccountList from "./AccountList.vue";
</script>

<template>
  <Card class="m-4">
    <template #content>
      <AccountList />
    </template>
  </Card>
</template>
