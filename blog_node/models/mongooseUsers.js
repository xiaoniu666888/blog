const mongoose = require('mongoose')
// 用户信息表

const mongooUser = new mongoose.Schema(
    {

        username: String,
        password: String,
        userDate: Date,
        userImg: String,
        nickname: String,
        introduction: String
    }
    , {
        // 去除版本号
        versionKey: false
    })
module.exports = mongoose.model("mongooUser", mongooUser)
