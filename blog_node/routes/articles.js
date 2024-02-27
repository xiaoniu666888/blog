const router = require('koa-router')()
const util = require('../utils')
const path = require('path')
const fs = require('fs')

const Note = require('../models/mongooseNotes')
// 路由前缀 
router.prefix('/articles')

// 获取文章列表
router.get('/article', async (ctx, next) => {

    // 根据作者获取
    const { noteAuthor } = ctx.request.query
    const { page, skipNum } = util.pager(ctx.request.query)
    let params = {}
    if (!noteAuthor) {
        params.noteAuthor = 'admin'
    } else {
        params.noteAuthor = noteAuthor
    }

    try {
        // 开始查找, 并且倒序排列, 即最新写的文章在最上边
        const query = Note.find(params, { noteAuthor: 0 }).sort({ _id: -1 })
        // 按照分页要求查找  
        // 跳过 skipNum 条,查找 page.pageSize 条, 
        // 比如每页显示6条,用户点击第三页,那就跳过(3-1)*6条,查询6条
        const list = await query.skip(skipNum).limit(page.pageSize)
        // 查询文档总数, 用于分页, 总数 / 6(每页显示的条数,一般是10条) = 页数
        const total = await Note.countDocuments(params)
        if (!list) return ctx.body = util.fail("未找到")

        ctx.body = util.success('查询成功',
            {
                page: {
                    ...page,
                    total
                },
                list
            }, 300)

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