const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/json', async (ctx, next) => {
  const { name } = ctx.request.body
  console.log(name);
  ctx.body = { data: '666', code: 200, msg: '成功' }
})

module.exports = router
