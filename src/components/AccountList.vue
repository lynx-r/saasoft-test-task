<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import { type Account } from "@/types";
import { storeToRefs } from "pinia";
import { Skeleton, VirtualScroller, type VirtualScrollerLazyEvent } from "primevue";
import { ref } from "vue";
import AccountActions from "./AccountActions.vue";
import AccountItem from "./AccountItem.vue";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
const { getAccounts, deleteAccount } = accountsStore;
const lazyLoading = ref(false);

const onLazyLoad = async (event: VirtualScrollerLazyEvent) => {
  lazyLoading.value = true;
  await getAccounts(event);
  lazyLoading.value = false;
};

const onDeleteAccount = (id: string) => {
  lazyLoading.value = true;
  deleteAccount(id);
  lazyLoading.value = false;
};
</script>

<template>
  <VirtualScroller
    :items="accounts"
    :item-size="60"
    :loading="lazyLoading"
    lazy
    keyField="id"
    class="h-155!"
    @lazy-load="onLazyLoad"
  >
    <template #item="{ item }: { item: Account }">
      <div v-if="!item" class="flex align-items-center p-3" style="height: 50px">
        <Skeleton width="60%" height="1rem" />
      </div>
      <div v-else :key="item.id" class="flex h-15 gap-2 items-center">
        <AccountItem :account="item" />
        <AccountActions @delete="onDeleteAccount(item.id)" />
      </div>
    </template>
  </VirtualScroller>
</template>
