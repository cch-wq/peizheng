<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <template #header>
                <div class="card-header">
                    <el-image :src="imgUrl" alt="" fit="scale-down"></el-image>
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="请输入手机号" :prefix-icon="UserFilled"></el-input>

                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="请输入密码"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item prop="validCode" v-if="formType">
                    <el-input v-model="loginForm.validCode" placeholder="请输入验证码" :prefix-icon="Lock" autocomplete="off">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submitForm(loginFormRef)" :style="{width: '100%'}">{{ formType ?  '注册':'登录'  }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import {getCode} from '../../api'
import { ElMessage } from 'element-plus';

const formType = ref(0)
const imgUrl = new URL('../../assets/login-head.png', import.meta.url).href
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
})
const handleChange = () => { formType.value = formType.value ? 0 : 1 }

//发送短信
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})
let flag = false
const countdownChange = () => {
    if (flag) return
    //手机号验证规则
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        })
    }
    //验证码60s的计时器
    const time=setInterval(() => {
        if (countdown.time <= 0) {
            countdown.time = 60
            countdown.validText = '获取验证码'
            flag = false
            clearInterval(time)
        } else {
            countdown.time -= 1
            countdown.validText = `剩余${countdown.time}s`
        }
    }, 1000)
    flag = true
    getCode({tel:loginForm.userName}).then(({data})=>{
        console.log(data)
        if(data.code===10000){
            ElMessage.success('发送成功')
        }
    })
}
//手机号验证规则
const validateUser = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请先输入手机号'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
    }
}
//密码验证规则
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请先输入密码'))
    } else {
        const userReg = /[0-9a-zA-Z_-]{4,10}$/
        userReg.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
    }
}
//验证规则
const rules = reactive({
    userName: [{ validator: validateUser, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }],
})

const loginFormRef=ref()
const submitForm=()=>{}
</script>

<style lang="less" scoped>
.login-container {
    height: 100%;

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>