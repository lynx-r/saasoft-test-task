<script setup lang="ts">
import useAccountsStore from "@/modules/accounts/accounts.store";
import type { Account } from "@/modules/accounts/accounts.types";
import { storeToRefs } from "pinia";
import { Message, VirtualScroller } from "primevue";
import AccountActions from "./AccountActions.vue";
import AccountItem from "./AccountItem.vue";

const accountsStore = useAccountsStore();
const { accounts, isLoading } = storeToRefs(accountsStore);
const { getAccounts: onLazyLoad } = accountsStore;
</script>

<template>
  <VirtualScroller
    v-if="accounts.length"
    :items="accounts"
    :item-size="60"
    :loading="isLoading"
    lazy
    show-loader
    keyField="id"
    class="h-135!"
    @lazy-load="onLazyLoad"
  >
    <template #item="{ item }: { item: Account }">
      <div v-if="item" :key="item.id" class="flex h-15 gap-2 items-center">
        <AccountItem :account="item" />
        <AccountActions :account-id="item.id" />
      </div>
    </template>
  </VirtualScroller>
  <Message v-else severity="warn" icon="pi pi-exclamation-circle">Учетных записей нет</Message>
</template>
