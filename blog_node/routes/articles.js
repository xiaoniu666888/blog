const router = require('koa-router')()
const util = require('../utils')
const path = require('path')
const fs = require('fs')

const Note = require('../models/mongooseNotes')
const { log } = require('console')
// 路由前缀 
router.prefix('/articles')

// 获取文章
router.get('/article', async (ctx, next) => {
    try {
        const { noteAuthor } = ctx.request.query

        if (!noteAuthor) return

        let res = await Note.find({ noteAuthor: noteAuthor }, { noteAuthor: 0 })

        if (!res) return ctx.body = util.fail("未找到")

        ctx.body = util.success('查询成功', res, 300)

    } catch (error) {
        console.error(error)
    }
})
// 获取文章详情
router.get('/detail', async (ctx, next) => {
    try {

        const { id } = ctx.request.query
        let res = await Note.findOne({ _id: id }, { title: 1, selectedType: 1, selectedTag: 1, noteUpDate: 1, noteFileUrl: 1 })
        if (res) {
            let data = fs.readFileSync("./public" + res.noteFileUrl, 'utf-8')

            let articleDeatil = {
                title: res.title,
                selectedType: res.selectedType,
                selectedTag: res.selectedTag,
                noteUpDate: res.noteUpDate,
                detail: data,
                id: res._id
            }

            ctx.body = util.success('获取文章详情成功', articleDeatil, 300)
        } else {
            ctx.body = util.fail('未查询到该文章', 400)
        }

    } catch (error) {
        console.error(error)
    }
})

module.exports = router