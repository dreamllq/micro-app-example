<template>
  <div>
  {{ a }}
  {{ $t("sss") }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  a:{
    type: String
  }
})
</script>

<style scoped>

</style>