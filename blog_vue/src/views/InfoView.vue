<script setup>
import { userStore } from '@/stores';
import { local, message } from '@/utils';

import { reactive, ref } from 'vue';
import { editUserInfo, updatePsd } from '@/api'
import { useRouter } from 'vue-router';
const useStore = userStore()
const router = useRouter()

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
    nickname: useStore.userInfo.nickname,
    introduction: useStore.userInfo.introduction
})

const activeName = ref('first')
// 点击编辑
const handleCilck = async () => {
    isEdit.value = !isEdit.value
    await myInput.value.focus()
}
// 点击取消编辑
const handleCancel = () => {
    isEdit.value = !isEdit.value
    formLabelAlign.nickname = useStore.userInfo.nickname
    formLabelAlign.introduction = useStore.userInfo.introduction
}
// 提交
const handleSubmit = () => {
    updateInfo()
}
// 修改用户信息
const updateInfo = async () => {
    let params = {};
    params.nickname = formLabelAlign.nickname
    params.introduction = formLabelAlign.introduction
    params.id = useStore.userInfo._id
    const res = await editUserInfo(params)
    useStore.userInfo = res
    local.set('userInfo', res)
    isEdit.value = !isEdit.value
}

// 修改密码

// 原密码验证
const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('原密码不能为空'))
    } else {
        callback()
    }
}
// 新密码验证
const validateNewPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('新密码不能为空'))
    } else if (value === psdForm.password) {
        callback(new Error('不能与原密码一致'))
    } else {
        callback()
    }
}
// 确认密码验证
const validateAgainPsd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== psdForm.newPassword) {
        callback(new Error("两次输入不一致"))
    } else {
        callback()
    }
}
// 注册表单ref
const psdFormRef = ref()
// 注册表单
const psdForm = reactive({
    password: '',
    newPassword: '',
    againNewPsd: ''
})

// 密码表单规则
const psdRules = reactive({
    password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
    newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
    againNewPsd: [{ required: true, validator: validateAgainPsd, trigger: 'blur' }]
})
// 取消修改密码
const handlePsdCancel = (formEl) => {
    formEl.resetFields()
}

// 提交
const handleSubmitPsd = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            let res = await updatePsd({ ...psdForm, _id: useStore.userInfo._id })
            if (res) {
                message("请重新登录", 400)
                local.clear()
                useStore.delUserInfo()
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            }
        }
        return false
    })
}
</script>


<template>
    <div id="editInfo">
        <el-tabs v-model="activeName" class="demo-tabs">
            <!-- 个人信息修改 -->
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
                            <span class="username"> {{ useStore.userInfo.nickname }}</span>
                        </span>
                        <span v-show="isEdit">
                            <el-input ref="myInput" v-model="formLabelAlign.nickname" />
                        </span>
                    </el-form-item>
                    <el-form-item label="简介">
                        <span v-show="!isEdit">
                            <span class="introduction"> {{ useStore.userInfo.introduction }}</span>
                        </span>
                        <span v-show="isEdit">
                            <el-input type="textarea" autosize v-model="formLabelAlign.introduction" />
                            <span class="desc">(展示到左栏)</span>
                        </span>
                    </el-form-item>
                </el-form>

                <el-button v-show="!isEdit" @click="handleCilck">编辑</el-button>
                <span v-show="isEdit">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button @click="handleSubmit" type="primary">提交</el-button></span>
            </el-tab-pane>
            <!-- 修改密码 -->
            <el-tab-pane label="修改密码" name="second">
                <el-form :model="psdForm" ref="psdFormRef" :rules="psdRules" style="max-width: 500px;"
                    :label-position="labelPosition" label-width="120px">

                    <el-form-item label="原密码:" prop="password">
                        <el-input v-model="psdForm.password" type="password" placeholder="请输入原密码" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="新密码:" prop="newPassword">
                        <el-input v-model="psdForm.newPassword" type="password" placeholder="请输入新密码" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="确认新密码:" prop="againNewPsd">
                        <el-input v-model="psdForm.againNewPsd" type="password" placeholder="请再次输入新密码" autocomplete="off" />
                    </el-form-item>

                </el-form>
                <el-button @click="handlePsdCancel(psdFormRef)">取消</el-button>
                <el-button type="primary" @click="handleSubmitPsd(psdFormRef)">提交</el-button>
            </el-tab-pane>
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

    :deep(.el-input__inner::placeholder) {
        color: #999;
        font-size: 14px;
        font-weight: 600;
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

        margin-right: 5px;
        vertical-align: bottom;
        transition: all .8s;
    }

    .username:hover {
        font-weight: 600;
    }
}
</style>@/stores