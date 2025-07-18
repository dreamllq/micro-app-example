<template>
  <div class='permission-layout'>
    <slot v-if='hasPermission === true' />
    <template v-else>
      <forbidden />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { checkPermission } from '@alsi/vue-permission';
import Forbidden from './forbidden.vue';

const route = useRoute();

const hasPermission = ref(true);

watch(() => route, () => {
  let { permissionKey } = route.meta;
  if (permissionKey) {
    hasPermission.value = checkPermission(permissionKey);
  } else {
    hasPermission.value = true;
  }
}, {
  deep: true,
  immediate: true
});

</script>

<style lang="scss" scoped>
.permission-layout {
  height: 100%;
}
</style>
