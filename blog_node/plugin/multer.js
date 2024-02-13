const multer = require('koa-multer');
const path = require('path')
const url = path.resolve(__dirname, '../../public/images')
let storage = multer.diskStorage({
    // 图片存储文件夹
    destination: function (ctx, file, cb) {
        console.log(file);
        cb(null, url)
    },
    // 图片存储名称
    filename: (ctx, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
let upload = multer({ storage: storage });
module.exports = upload

