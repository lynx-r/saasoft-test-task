<script setup lang="ts">
import useAccountsStore from "@/stores/accounts";
import { Button } from "primevue";

const { addAccount } = useAccountsStore();
</script>

<template>
  <div class="flex items-center gap-2">
    <div>Учетные записи</div>
    <Button icon="pi pi-plus" @click="addAccount" />
  </div>
</template>
