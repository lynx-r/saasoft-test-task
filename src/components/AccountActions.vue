<script setup lang="ts">
import { Button } from "primevue";
defineProps(["deleting"]);
const emit = defineEmits(["delete"]);
</script>

<template>
  <Button
    icon="pi pi-trash"
    severity="danger"
    variant="text"
    rounded
    :loading="deleting"
    aria-label="Cancel"
    @click="emit('delete')"
  />
</template>
