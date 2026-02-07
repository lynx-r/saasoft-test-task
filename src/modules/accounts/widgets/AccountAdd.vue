<script setup lang="ts">
import useAccountsStore from "@/modules/accounts/accounts.store";
import { storeToRefs } from "pinia";
import { Button } from "primevue";

const store = useAccountsStore();

const { createAccount: onCreateAccount } = store;
const { isAdding } = storeToRefs(store);
</script>

<template>
  <div class="flex items-center gap-2">
    <div>Учетные записи</div>
    <Button icon="pi pi-plus" :loading="isAdding" @click="onCreateAccount" />
  </div>
</template>
