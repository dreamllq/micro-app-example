<template>
  <template v-if='ready'>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLoginUserInfo } from '@alsi/micro-framework-sdk';

const props = defineProps({
  beforeLayoutMount: {
    type: Function,
    default: () => 0
  }
});

const ready = ref(false);

onMounted(async () => {
  const userInfo = getLoginUserInfo();
  await props.beforeLayoutMount({ userInfo });
  ready.value = true;
});

</script>

<style scoped>

</style>