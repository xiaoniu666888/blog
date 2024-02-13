<script setup>
import CanvasView from './components/CanvasView.vue';
import MsgView from './components/MsgView.vue';
// import { getToken } from '@/api'
</script>

<template>
  <!-- <el-button @click="getToken">token</el-button> -->
  <canvas-view></canvas-view>
  <msg-view></msg-view>
  <div class="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style  lang="scss" scoped>
:global(.center) {
  max-width: 95vw;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
