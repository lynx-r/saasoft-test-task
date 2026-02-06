<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import { Panel } from "primevue";
import AccountList from "./AccountList.vue";
import AccountListSkeleton from "./AccountListSkeleton.vue";

const accountsStore = useAccountsStore();
</script>

<template>
  <Panel header="Список учетных записей">
    <AccountListSkeleton v-if="accountsStore.isFirstLoading" />
    <AccountList v-else />
  </Panel>
</template>
