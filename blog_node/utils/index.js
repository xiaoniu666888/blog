const jwt = require('jsonwebtoken')
const privateKey = '#xiaoniu$'  // token解密钥匙
module.exports = {
    // 请求成功返回
    success(message, data = {}, code = 200) {

        return { message, data, code }
    },
    // 请求失败返回
    fail(message, code = 400, data = {}) {
        return { message, data, code }
    },
    // 设置token
    setToken(value) {
        return jwt.sign(value, privateKey, { expiresIn: "7days" })
    },
    // 验证token
    verifyToken(header) {
        return new Promise((resolve, reject) => {
            if (header) {
                let token = header.split(' ')[1]
                jwt.verify(token, privateKey, function (err, decoded) {
                    resolve(decoded)
                })
            } else {
                return ''
            }

        })
    },
    // 处理分页
    pager({ currentPage = 1, pageSize = 6 }) {
        // 函数参数使用了解构赋值，同时给定了默认值，如果参数对象中没有对应的属性，将使用默认值1和10
        currentPage *= 1; // pageNum乘以1的目的是将其转换为数字类型
        pageSize *= 1; // pageSize乘以1的目的是将其转换为数字类型
        const skipNum = (currentPage - 1) * pageSize; // 根据当前页数和每页大小计算要跳过的数据数量
        return {
            page: {
                currentPage,
                pageSize
            }, // 返回一个具有currentPage和pageSize属性的page对象
            skipNum // 返回skipNum变量
        };
    },
}