const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const index = require('./routes/index')
const users = require('./routes/users')
const koaJwt = require('koa-jwt')
const util = require('./utils')
const { koaBody } = require('koa-body');
const path = require('path')
require("./db/mongoose")
require("./config/swagger-app-wrapper")(app)
// error handler
onerror(app)
app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(koaBody({
  multipart: true,
  formidable: {
    // uploadDir: path.join(__dirname, `/public/images`),  //上传文件存储目录
    keepExtensions: true,  //允许保留后缀名
    multipart: true,
  }
}));

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 验证token是否过期
app.use(async (ctx, next) => {
  await next().catch(err => {
    if (err.status == '401') {
      console.log(err.status);
      ctx.body = util.fail('Token认证失败,请重新登录', 401)
    } else {
      throw err
    }
  })
})
// 拦截
app.use(koaJwt({ secret: '#xiaoniu$' }).unless({
  // 过滤注册登录接口，不进行token校验
  path: [/^\/users\/login/, /^\/users\/reg/]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
