<script setup lang="ts">
import { Card } from "primevue";
import AccountAdd from "./components/AccountAdd.vue";
import AccountsCard from "./components/AccountsCard.vue";
import TagNotice from "./components/TagNotice.vue";
</script>

<template>
  <Card class="m-8">
    <template #content>
      ?
      <div class="flex flex-col gap-2">
        <AccountAdd />
        <TagNotice />
        <AccountsCard />
      </div>
    </template>
  </Card>
</template>
