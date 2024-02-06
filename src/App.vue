<script setup>
</script>

<template>
  <div class="app">
    <header>
      <router-link to='/home'> <button>home</button></router-link>

      <router-link to='/about'> <button>about</button> </router-link>

    </header>


    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
