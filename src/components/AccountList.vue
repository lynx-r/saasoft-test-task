<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import type { Account } from "@/types/account";
import { storeToRefs } from "pinia";
import { Message, VirtualScroller } from "primevue";
import AccountActions from "./AccountActions.vue";
import AccountItem from "./AccountItem.vue";
import AccountsSkeleton from "./AccountsSkeleton.vue";

const accountsStore = useAccountsStore();
const { accounts, isFirstLoading, isLoading, deletingId } = storeToRefs(accountsStore);
const { getAccounts: onLazyLoad, deleteAccount: onDeleteAccount } = accountsStore;
</script>

<template>
  <AccountsSkeleton v-if="isFirstLoading" />
  <VirtualScroller
    v-else-if="accounts.length"
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
        <AccountActions :deleting="deletingId === item.id" @delete="onDeleteAccount(item.id)" />
      </div>
      <div v-else>
        {{ item === undefined }}
      </div>
    </template>
  </VirtualScroller>
  <Message v-else severity="warn" icon="pi pi-exclamation-circle">Учетных записей нет</Message>
</template>
