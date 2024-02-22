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

// 上传头像
export function uploadAvatar(data) {
    return xnRequestOne.post({
        url: '/users/avatar',
        data
    })
}

// 修改信息
export function editUserInfo(data) {
    return xnRequestOne.post({
        url: '/users/info',
        data
    })
}

// 修改密码
export function updatePsd(data) {
    return xnRequestOne.post({
        url: '/users/psd',
        data
    })
}
