<script setup lang="ts">
import AccountAdd from "./components/AccountAdd.vue";
import AccountsCard from "./components/AccountsCard.vue";
import TagNotice from "./components/TagNotice.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <AccountAdd />
    <TagNotice />
    <AccountsCard />
  </div>
</template>
