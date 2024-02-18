const router = require('koa-router')()
const util = require('../utils')
const path = require('path')
const fs = require('fs')

const Note = require('../models/mongooseNotes')
// 路由前缀 
router.prefix('/articles')

// 获取文章
router.get('/article', async (ctx, next) => {
    try {
        const { noteAuthor } = ctx.request.query

        if (!noteAuthor) return

        let res = await Note.findOne({ noteAuthor })

        if (!res) return ctx.body = util.fail("未找到")
        ctx.body = util.success("获取成功")
        let data = fs.readFileSync("./public" + res.noteFileUrl, 'utf-8')
        ctx.body = util.success('', data)

    } catch (error) {
        console.error(erroe)
    }

})

module.exports = router