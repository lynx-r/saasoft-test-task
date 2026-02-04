<script setup lang="ts">
import { Button } from "primevue";

const emit = defineEmits(["delete"]);
</script>

<template>
  <Button
    icon="pi pi-trash"
    severity="danger"
    variant="text"
    rounded
    aria-label="Cancel"
    @click="emit('delete')"
  />
</template>
