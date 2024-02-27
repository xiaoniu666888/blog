<script setup>
import { useRouter } from 'vue-router'
import { message, local } from '@/utils';
import { reactive, ref } from 'vue'
import { userReg, userLogin } from '@/api'
import { userStore } from '@/stores'
const useStore = userStore()
const router = useRouter()
// 登录
const ruleLoginFormRef = ref()
// 登录表单
const ruleForm = reactive({
    username: '',
    password: ''
})
// 登录用户名验证
const validateUser = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        // if (ruleForm.username !== '') {
        //     if (!ruleLoginFormRef.value) return
        //     ruleLoginFormRef.value.validateField('checkPass', () => null)
        // }
        callback()
    }
}
// 登录密码验证
const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
// 登录表单规则
const rules = reactive({
    username: [{ validator: validateUser, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }]
})

// 注册
const ruleRegFormRef = ref()
const isReg = ref(true)
// 注册表单
const ruleRegForm = reactive({
    username: '',
    password: '',
    againPsd: ''
})
// 注册用户名验证
const validateRegUser = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        // if (ruleRegForm.username !== '') {
        //     if (!ruleRegFormRef.value) return
        //     ruleRegFormRef.value.validateField('checkPass', () => null)
        // }
        callback()
    }
}
// 注册密码验证
const validateRegPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
// 注册确认密码验证
const validateRegAgainPsd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleRegForm.password) {
        callback(new Error("两次输入不一致"))
    } else {
        callback()
    }
}
// 注册表单规则
const regRules = reactive({
    username: [{ validator: validateRegUser, trigger: 'blur' }],
    password: [{ validator: validateRegPassword, trigger: 'blur' }],
    againPsd: [{ validator: validateRegAgainPsd, trigger: 'blur' }]
})
// 重置表单
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}


// 提交表单(登录/注册)
const submitForm = (formEl, operate) => {
    if (!formEl) return
    // 登录
    if (operate === 'login') {
        formEl.validate(async (valid) => {
            if (valid) {
                const res = await userLogin(ruleForm)
                if (res) {
                    resetForm(ruleLoginFormRef.value)
                    useStore.userInfo = res
                    local.set('userInfo', res)
                    router.push('/')
                } else {
                    resetForm(ruleLoginFormRef.value)
                }
            } else {
                message("用户名或密码任意一项不能为空", 400)
                return false
            }
        })
    } else {
        // 注册
        formEl.validate(async (valid) => {
            if (valid) {
                const res = await userReg(ruleRegForm)
                if (res) {
                    resetForm(ruleRegFormRef.value)
                }
            } else {
                message("任意一项均不能为空或填写错误", 400)
                return false
            }
        })
    }

}
// 已有帐号,去登陆
const goLogin = () => {
    isReg.value = !isReg.value
    resetForm(ruleRegFormRef.value)
}

// 去注册

const goReg = () => {
    isReg.value = !isReg.value
    resetForm(ruleLoginFormRef.value)
}

</script>


<template>
    <div class="login center">


        <div class="login-container">
            <!-- 登录 -->


            <transition mode="out-in" name="login">
                <el-form style="background: linear-gradient(to right, #9fe1fa, #f4edc9); border-radius: 3%;" v-show="isReg"
                    class="login-form demo-ruleForm" ref="ruleLoginFormRef" :model="ruleForm" status-icon :rules="rules"
                    label-width="65px" label-position="top">
                    <h2 class="loginTitle">用户登录</h2>

                    <el-form-item label="用户名" prop="username">
                        <el-input v-model.trim="ruleForm.username" style="min-width: 40vw;" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="ruleForm.password" style="min-width: 40vw;" type="password"
                            autocomplete="off" />
                    </el-form-item>

                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm(ruleLoginFormRef, 'login')">登录</el-button>
                        <el-button @click="goReg">注册</el-button>
                    </el-form-item>
                </el-form>
            </transition>

            <!-- 注册 -->
            <transition mode="out-in" name="reg">
                <el-form style="background: linear-gradient(to right, #9fe1fa, #f4edc9); border-radius: 3%;" v-show="!isReg"
                    class="login-form reg-form demo-ruleForm" ref="ruleRegFormRef" :model="ruleRegForm" status-icon
                    :rules="regRules" label-width="65px" label-position="top">

                    <h2 class="loginTitle">{{ isReg ? '用户登录' : '用户注册' }}</h2>

                    <el-form-item label="用户名" prop="username">
                        <el-input v-model.trim="ruleRegForm.username" style="min-width: 40vw;" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="ruleRegForm.password" style="min-width: 40vw;" type="password"
                            autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="再次输入密码" style="min-width: 40vw;" prop="againPsd">
                        <el-input v-model.trim="ruleRegForm.againPsd" type="password" autocomplete="off" />
                    </el-form-item>

                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm(ruleRegFormRef, 'reg')">注册</el-button>
                        <el-button @click="resetForm(ruleRegFormRef)">重置</el-button>
                    </el-form-item>
                    <span @click="goLogin">已有账号，去登陆</span>
                </el-form>
            </transition>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.login {
    width: 60vw;

    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;

        .loginTitle {
            font-size: 20px;
            font-weight: bold;
            color: #42BDEE;
        }

        .login-form {
            position: relative;
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5vw;
            background-color: #fff;
            box-shadow: 0px 0px 5px 2px #eee;

            span {
                position: absolute;
                font-size: 12px;
                color: #42BDEE;
                border-bottom: 1px solid #42BDEE;
                bottom: 1.2vh;
                left: auto;
                cursor: pointer;
            }
        }
    }
}

.login-enter-active,
.login-leave-active {
    transition: all .8s ease;
}

.login-enter-from,
.login-leave-to {
    opacity: 0;
    transform: translateX(-3vw);
}

.login-enter-to,
.login-leave-from {
    opacity: 1;
    transform: translateX(23vw);
}

.reg-enter-active,
.reg-leave-active {
    transition: all .8s ease;
}

.reg-enter-from,
.reg-leave-to {
    opacity: 0;
    transform: translateX(3vw);
}

.reg-enter-to,
.reg-leave-from {
    transform: translateX(-23vw);
    opacity: 1;
}
</style>@/stores