<script setup>
import { userStore } from '@/stores/users';
import { local, message } from '@/utils';
import { reactive } from 'vue';

const useStore = userStore()

const otherData = reactive({
    id: useStore.userInfo._id,
})
const headers = {
    "Authorization": "Bearer " + useStore.userInfo.token
}
const handleUploadSuccess = (res) => {
    if (res.data.token) {
        local.set("userInfo", res.data)
    }
    useStore.userInfo = res.data
    message(res.message, res.code)
}

</script>


<template>
    <div id="editInfo">
        <div>
            头像:
            <el-avatar style="vertical-align: middle;" :src="'/api' + useStore.userInfo.userImg">
            </el-avatar>

            <el-upload class="upload-demo" action="/api/users/avatar" :data="otherData" :show-file-list="false"
                :headers="headers" :on-success="handleUploadSuccess">
                <el-button type="primary">上传头像</el-button>
            </el-upload>
        </div>
    </div>
</template>


<style scoped></style>