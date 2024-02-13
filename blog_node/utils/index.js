const jwt = require('jsonwebtoken')
const privateKey = '#xiaoniu$'  // token解密钥匙
module.exports = {
    success(data = {}, message, code = 200) {

        return { message, data, code }
    },
    fail(message, code = 400, data = {}) {
        return { message, data, code }
    },
    setToken(value) {
        return jwt.sign(value, privateKey, { expiresIn: "7days" })
    },
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
    }
}