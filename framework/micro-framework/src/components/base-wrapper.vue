<template>
  <template v-if='keepAlive.open === true'>
    <router-view v-slot='{ Component }'>
      <keep-alive :max='keepAlive.max || 99' :include='include' :exclude='exclude'>
        <template v-if='!forceUpdate'>
          <component :is='Component' />
        </template>
        <template v-else>
          <component :is='UpdateRoute' />
        </template>
      </keep-alive>
    </router-view>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { nextTick, PropType, ref, watch } from 'vue';
import UpdateRoute from './update-route.vue';
import { cloneDeep } from 'lodash';

const props = defineProps({
  keepAlive: {
    type: Object as PropType<{
    open?: boolean,
    max?: number,
    include?:any,
    exclude?:any
  }>,
    default: () => ({})
  }
});

const include = ref(cloneDeep(props.keepAlive.include));
const exclude = ref(cloneDeep(props.keepAlive.exclude));

const forceUpdate = ref(false);

watch(() => [props.keepAlive.include, props.keepAlive.exclude], async () => {
  forceUpdate.value = true;
  await nextTick();
  include.value = cloneDeep(props.keepAlive.include);
  exclude.value = cloneDeep(props.keepAlive.exclude);
  await nextTick();
  forceUpdate.value = false;
});
</script>

<style scoped>

</style>