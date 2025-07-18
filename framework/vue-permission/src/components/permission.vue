<template>
  <template v-if='renderNoPermission === true || hasPermission === true'>
    <slot :has-permission='hasPermission' />
  </template>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { usePermission } from '@/services/use-permission';
import { type PermissionLogic } from '../type';

const props = defineProps({
  param: {
    type: [
      String,
      Array,
      Object
    ] as PropType<string | string[] | PermissionLogic>,
    default: ''
  },
  renderNoPermission: {
    type: Boolean,
    default: false
  }
});

const { hasPermission } = usePermission(props.param);
</script>