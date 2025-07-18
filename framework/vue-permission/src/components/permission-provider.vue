<template>
  <template v-if='permissionKeys !== null'>
    <slot />
  </template>
  <template v-else>
    <slot name='loading' />
  </template>
</template>

<script setup lang="ts">
import { usePermissionProvider } from '@/services/use-permission';

const { permissionKeys } = usePermissionProvider();

</script>

<style scoped>

</style>