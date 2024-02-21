<script setup>
import { userStore } from '@/stores/users';
import { local, message } from '@/utils';

import { reactive, ref } from 'vue';

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
// 个人信息
const myInput = ref()
const isEdit = ref(false)

const labelPosition = ref('left')

const formLabelAlign = reactive({
    username: '',
    introduction: ''
})

const activeName = ref('first')
const handleClick = (tab, event) => {
    console.log(tab, event)
}
const handleCilck = async () => {
    isEdit.value = !isEdit.value
    // myInput.value.focus()
    await myInput.value.focus()
}
</script>


<template>
    <div id="editInfo">

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign"
                    style="max-width: 460px;">
                    <el-form-item label="头像">
                        <div class="avatar">
                            <el-avatar :size="50" style="vertical-align: bottom; margin-right: 1vw;"
                                :src="'/api' + useStore.userInfo.userImg" />
                            <el-upload class="upload-demo" action="/api/users/avatar" :data="otherData"
                                :show-file-list="false" :headers="headers" :on-success="handleUploadSuccess">
                                <el-button type="primary" size="small" icon="Edit" circle />
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <span v-show="!isEdit">
                            <span class="username" @click="handleCilck"> {{ useStore.userInfo.username }}</span>
                            <span class="desc">(点击修改)</span></span>
                        <span v-show="isEdit">
                            <el-input ref="myInput" v-model="useStore.userInfo.username" v-on:blur="handleCilck"></el-input>

                        </span>
                        <!-- <el-button @click="isEdit = !isEdit" style="margin-left: 0.5vw;" type="primary" size="small" icon="Edit"
                    circle /> -->
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" v-model="formLabelAlign.introduction" />
                        <span class="desc">(展示到左栏)</span>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">修改密码</el-tab-pane>

        </el-tabs>


    </div>
</template>


<style lang="scss" scoped>
#editInfo {
    height: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    opacity: .5;

    :deep(.el-form-item__label) {
        font-size: 18px;
        color: black;
        color: #999;
    }

    .avatar {
        display: flex;
        align-items: flex-end;
    }

    .desc {
        color: #999;
        font-size: 12px;
    }

    .username {
        cursor: pointer;
    }

    .username:hover {
        font-weight: 600;
    }
}
</style>