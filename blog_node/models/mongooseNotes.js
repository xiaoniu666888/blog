const mongoose = require('mongoose')
// 用户信息表

const mongooNote = new mongoose.Schema(
    {
        title: String, // 标题
        desc: String, // 描述
        selectedType: Object, // 分类
        selectedTag: String, // 标签
        noteImgUrl: String, // 缩略图地址
        noteFileUrl: String, // 文件保存地址
        noteUpDate: Date, // 创建时间
        noteAuthor: String // 作者
    }
    ,
    {
        // 去除版本号
        versionKey: false
    }
)
module.exports = mongoose.model("mongooNote", mongooNote)