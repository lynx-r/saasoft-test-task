<script setup lang="ts">
import { Card } from "primevue";
import AccountAdd from "../widgets/AccountAdd.vue";
import AccountsCard from "../widgets/AccountsCard.vue";
import TagNotice from "../widgets/TagNotice.vue";
</script>

<template>
  <Card class="m-8">
    <template #content>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <AccountAdd />
          <TagNotice />
        </div>
        <AccountsCard />
      </div>
    </template>
  </Card>
</template>
