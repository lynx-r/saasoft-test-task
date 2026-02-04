<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import { type Account } from "@/types/account";
import { storeToRefs } from "pinia";
import { Message, Skeleton, VirtualScroller } from "primevue";
import AccountActions from "./AccountActions.vue";
import AccountItem from "./AccountItem.vue";

const accountsStore = useAccountsStore();
const { accounts, isLoading, deletingId } = storeToRefs(accountsStore);
const { getAccounts, deleteAccount } = accountsStore;
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
    @lazy-load="getAccounts"
  >
    <template #item="{ item }: { item: Account }">
      <div v-if="!item" class="flex align-items-center p-3" style="height: 50px">
        <Skeleton width="60%" height="1rem" />
      </div>
      <div v-else :key="item.id" class="flex h-15 gap-2 items-center">
        <AccountItem :account="item" />
        <AccountActions :deleting="deletingId === item.id" @delete="deleteAccount(item.id)" />
      </div>
    </template>
  </VirtualScroller>
  <Message v-else severity="warn" icon="pi pi-exclamation-circle">Учетных записей нет</Message>
</template>
