import { ElMessage } from 'element-plus'
const namespace = 'users'  // 设置命名空间
function message(message, code = 200) {

    if (code === 200 && message) {
        ElMessage({
            type: 'success',
            message
        })

    } else if (code === 300 && message) {

        ElMessage({
            type: 'info',
            message
        })
    } else if (code === 400 && message) {
        ElMessage({

            type: 'warning',
            message
        })
    } else if (code === 401 && message) {
        ElMessage({
            type: 'error',
            message
        })
    }
    else if (code == 404) {
        ElMessage({

            type: 'error',
            message: '404 Not Found'
        })
    }
}


class xnStorage {
    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage
    }
    // 存入
    set(key, val) {
        let storage = this.getStorage()
        storage[key] = val
        window.localStorage.setItem(namespace, JSON.stringify(storage))
    }
    // 获取
    get(key) {
        return this.getStorage()[key]
    }
    // 删除
    delete(key) {
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(namespace, JSON.stringify(storage))
    }

    clear() {
        window.localStorage.clear()
    }

    // 获取命名空间
    getStorage() {
        return JSON.parse(window.localStorage.getItem(namespace) || "{}")
    }

}

const local = new xnStorage()
const session = new xnStorage(false)
export { message, local, session }