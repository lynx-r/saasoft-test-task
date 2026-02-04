<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import { storeToRefs } from "pinia";
import AccountActions from "./AccountActions.vue";
import AccountItem from "./AccountItem.vue";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
const { deleteAccount } = accountsStore;
</script>

<template>
  <div class="border border-gray-400 py-4 px-2 rounded-sm h-160 overflow-auto flex flex-col gap-2">
    <div v-for="account of accounts" :key="account.id" class="flex h-15 items-center gap-2">
      <AccountItem :account="account" />
      <AccountActions @delete="deleteAccount(account.id)" />
    </div>
  </div>
</template>
