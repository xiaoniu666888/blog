<script setup>
import { userStore } from '@/stores/users';
import { ref } from 'vue';
const useStore = userStore()
// 默认头像地址
const avaUrl = ref("/api/images/default.jpg")
</script>


<template>
    <div class="left">
        <header>
            <el-avatar :size="60" :src="'/api' + useStore.userInfo.userImg || avaUrl" />
        </header>
        <main class="personInfo">
            <div>
                <!-- {{ useStore.userInfo.username }} -->
            </div>
            <!-- <div>爱好：听歌、写代码</div>
            <div>创建时间:{{ useStore.userInfo.userDate }}</div> -->
        </main>
    </div>
</template>


<style lang="scss" scoped>
.left {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .personInfo {
        margin-top: 5vh;
        height: 30vh;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }
}
</style>