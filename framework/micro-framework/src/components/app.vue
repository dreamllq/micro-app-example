<template>
  <layout-wrapper v-if='isFullView === false' :before-layout-mount='beforeLayoutMount'>
    <component :is='layout'>
      <permission>
        <router-view />
      </permission>
    </component>
  </layout-wrapper>
  <router-view v-else />
</template>

<script setup lang="ts">
import { PropType, Component, ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from './default-layout.vue';
import LayoutWrapper from './layout-wrapper.vue';
import Permission from './permission.vue';

const props = defineProps({
  fullView: {
    type: Array as PropType<RegExp[]>,
    default: () => []
  },
  layout: {
    type: Object as PropType<Component>,
    default: DefaultLayout
  },
  beforeLayoutMount: {
    type: Function,
    default: () => undefined
  }
});

const router = useRouter();

const isFullView = ref(true);

router.beforeEach((to) => {
  isFullView.value = props.fullView.reduce((acc, item) => acc || item.test(to.path), false);
});

</script>

<style scoped>

</style>