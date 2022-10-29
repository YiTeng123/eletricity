<template>
  <div class="head">
    <div class="head-left">
      <div @click="handleAside" class="head-left-button"></div>
      <div class="head-left-title"></div>
    </div>
    <div class="head-right" @click="hanleExit">
      <span class="head-right-Admin">Admin</span>
      <div class="head-right-icon"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()
const handleAside = () => {
  store.setAsideButton()
}
const hanleExit = () => {
  sessionStorage.removeItem('token')
  router.push('/Eletricity_login')
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  height: 100%;
  justify-content: space-between;

  & .head-left {
    display: flex;
    align-items: center;

    & .head-left-button {
      background-image: url(../assets/image/headerButton.png);
      height: 30px;
      width: 30px;
      cursor: pointer;
    }

    & .head-left-title {
      background-image: url(../assets/image/headerTitle.png);
      width: 260px;
      height: 30px;
      background-size: 100% 100%;
      margin-left: 23px;
    }
  }

  & .head-right {
    display: flex;
    align-items: center;
    cursor: pointer;

    & .head-right-Admin {
      font-size: 18px;
      color: #CFD7E9;
      font-weight: 400;
    }

    & .head-right-icon {
      width: 20px;
      height: 20px;
      background-image: url(../assets/image/headerIcon.png);
    }
  }
}
</style>