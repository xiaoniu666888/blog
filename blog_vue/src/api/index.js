import { xnRequestOne } from '../request'

// 注册
export function userReg(data) {
    return xnRequestOne.post({
        url: '/users/reg',
        data
    })
}
// 登录
export function userLogin(data) {
    return xnRequestOne.post({
        url: '/users/login',
        data
    })
}

// 验证token
export function getToken() {
    return xnRequestOne.get({
        url: '/users/token'
    })
}

// 上传头像
export function uploadAvatar(data) {
    return xnRequestOne.post({
        url: '/users/avatar',
        data
    })
}