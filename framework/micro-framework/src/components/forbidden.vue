
<template>
  <div class='page-http-status'>
    <div class='page-body'>
      <img :src='httpStatusImg'>
      <div class='page-info'>
        <div class='page-title'>
          403
        </div>
        <div class='page-tip'>
          抱歉，您无权访问此页面
        </div>
        <div class='btn' @click='goHome'>
          返回首页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import httpStatusImg from '../assets/403.png';
import { useRouter } from 'vue-router';

const router = useRouter();
const goHome = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.page-http-status {
  text-align: left;
  position: relative;
  top: 50%;
  transform: translateX(0) translateY(-50%);
  
  .page-body {
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;

    .page-info {
      margin: 34px 0 0 47px;
    }

    .page-tip {
      color: #333333;
      font-size: 14px;
      line-height: 19px;
    }

    .page-title {
      font-size: 62px;
      font-weight: bold;
      color: #333300;
      line-height: 82px;
      width: 115px;
      height: 82px;
    }

    .btn {
      width: 56px;
      height: 19px;
      font-size: 14px;
      color: #014996;
      line-height: 19px;
      cursor: pointer;
      margin-top: 8px;
    }
  }
}
</style>
