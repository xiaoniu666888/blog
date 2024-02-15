import axios from 'axios'
import { message, local } from '@/utils'
import router from '@/router'

// 封装
class xnRequest {
    constructor(baseURL) {
        this.baseURL = baseURL

        this.instance = axios.create({
            baseURL
        })

        this.requestInercept(this.instance)
        this.responseInercept(this.instance)
    }
    requestInercept(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            const headers = config.headers;
            const { token = "" } = local.get('userInfo') || {}
            if (!headers.Authorization) headers.Authorization = `Bearer ${token}`;
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
    }

    responseInercept(instance) {
        instance.interceptors.response.use(function (response) {
            const { data, code, message: msg } = response.data;
            if (code === 200) {
                // 如果状态码是200，调用message函数并返回数据  
                message(msg, code);
                return data;
            } else if (code === 401) {
                message(msg, code);
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
                return false;
            } else {
                message(msg, code);
                return false;
            }
        }, function (err) {
            return Promise.reject(err);
        })
    }
    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: 'get' })
    }

    post(config) {
        return this.request({ ...config, method: 'post' })
    }
}

export const xnRequestOne = new xnRequest('/api')
