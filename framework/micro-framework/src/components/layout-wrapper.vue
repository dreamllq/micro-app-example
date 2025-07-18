<template>
  <login-user-info-wrapper>
    <v-permission-provider>
      <biz-layout-wrapper :before-layout-mount='beforeLayoutMount'>
        <slot />
      </biz-layout-wrapper>
      <template #loading>
        <div style='height: 100%;'>
          <div v-loading='true' style='height: 100%;' />
        </div>
      </template>
    </v-permission-provider>
  </login-user-info-wrapper>
</template>

<script setup lang="ts">
import LoginUserInfoWrapper from './login-user-info-wrapper.vue';
import BizLayoutWrapper from './biz-layout-wrapper.vue';
defineProps({
  beforeLayoutMount: {
    type: Function,
    default: () => undefined
  }
});
</script>