const router = require('koa-router')()
const util = require('../utils')
const path = require('path')
const fs = require('fs')
const Note = require('../models/mongooseNotes')
// 路由前缀 
router.prefix('/notes')

// 上传笔记缩略图
router.post('/img', (ctx, next) => {
    const file = ctx.request.files.file;
    if (!file) return ctx.body = util.fail({}, '请上传文章缩略图')
    const savefilePath = path.join(__dirname, '../public/notes/imgs', file.newFilename); // 文件保存路径 
    const url = savefilePath.split('public')[1]
    const reader = fs.createReadStream(file.filepath); // 创建可读流来读取上传的文件  
    const writer = fs.createWriteStream(savefilePath); // 创建可写流来写入文件到服务器  

    reader.pipe(writer); // 将可读流导入可写流  
    return new Promise((resolve, reject) => {
        writer.on('finish', async () => {
            // 文件保存成功  
            ctx.body = util.success('图片上传成功', url)
            resolve();
        })

        writer.on('error', (err) => {
            // 文件保存失败  
            // ctx.status = 500;
            ctx.body = util.fail('图片上传失败', 400)
            reject(err);
        });
    })


})
// 上传笔记
router.post('/file', (ctx, next) => {
    const file = ctx.request.files.file;
    if (!file) return ctx.body = util.fail({}, '请上传文章缩略图')
    const savefilePath = path.join(__dirname, '../public/notes/files', file.newFilename); // 文件保存路径 
    const url = savefilePath.split('public')[1]
    const reader = fs.createReadStream(file.filepath); // 创建可读流来读取上传的文件  
    const writer = fs.createWriteStream(savefilePath); // 创建可写流来写入文件到服务器  

    reader.pipe(writer); // 将可读流导入可写流  
    return new Promise((resolve, reject) => {
        writer.on('finish', async () => {
            // 文件保存成功  
            ctx.body = util.success('文件上传成功', url)
            resolve();
        })

        writer.on('error', (err) => {
            // 文件保存失败  
            // ctx.status = 500;
            ctx.body = util.fail('文件上传失败', 500)
            reject(err);
        });
    })
})
// 上传笔记信息之前检查标题是否重复
router.post('/checktitle', async (ctx, next) => {
    try {
        const { title } = ctx.request.body
        console.log(title);
        let res = await Note.findOne({ title })
        // 标题重复
        if (res) return ctx.body = util.fail('标题已存在', 400)
        return ctx.body = util.success('标题合适', {}, 300)
    } catch (error) {
        console.error(error)
    }
})
// 上传笔记信息
router.post('/info', async (ctx, next) => {
    try {
        const { title,
            desc,
            selectedType,
            selectedTag,
            noteImgUrl,
            noteFileUrl,
            noteAuthor
        } = ctx.request.body

        // 创建笔记信息
        const res = await Note.create({
            title,
            desc,
            selectedType,
            selectedTag,
            noteImgUrl,
            noteFileUrl,
            noteUpDate: Date.now(),
            noteAuthor
        })
        if (res) {
            return ctx.body = util.success('上传成功', {})
        }
    } catch (error) {
        console.error(error)
    }

})


module.exports = router