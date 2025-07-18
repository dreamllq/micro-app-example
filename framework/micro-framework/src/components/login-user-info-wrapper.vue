<template>
  <slot v-if='ready' />
  <div v-else style='height: 100%;'>
    <div v-loading='!ready' style='height: 100%;' />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initLoginUserInfo } from '@alsi/micro-framework-sdk';

const ready = ref(false);

onMounted(async () => {
  await initLoginUserInfo();
  ready.value = true;
});
</script>

<style scoped>

</style>