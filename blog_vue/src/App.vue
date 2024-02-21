<script setup>

import MsgView from './components/MsgView.vue';

</script>

<template>
  <msg-view></msg-view>
  <div class="app">
    <main class="animate__animated animate__backInDown">
      <router-view></router-view>
    </main>
  </div>
</template>

<style  lang="scss" scoped>
:global(.center) {
  max-width: 98vw;
  margin: 0 auto;
  box-sizing: border-box;
}

.app {
  background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%)
}
</style>
