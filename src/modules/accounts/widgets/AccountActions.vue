<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Button } from "primevue";
import useAccountsStore from "../accounts.store";
const { accountId } = defineProps<{ accountId: string }>();

const store = useAccountsStore();

const { deleteAccount: onDeleteAccount } = store;
const { deletingId } = storeToRefs(store);
</script>

<template>
  <Button
    icon="pi pi-trash"
    severity="danger"
    variant="text"
    rounded
    :loading="deletingId === accountId"
    aria-label="Cancel"
    @click="onDeleteAccount(accountId)"
  />
</template>
