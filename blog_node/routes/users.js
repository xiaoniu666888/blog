const router = require('koa-router')()
const User = require('../models/mogooseUsers')
const util = require('../utils')
const path = require('path')
const fs = require('fs')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
/**  
 * @swagger  
 * /users/reg:  
 *   post:  
 *     description: 用户注册  
 *     tags: [users]  
 *     summary: 用户注册
 *     produces:  
 *       - application/json  
 *     parameters: 
 *        - in: body  
 *        - name: username
 *          required: true
 *          schema:
 *              type: string
 *          description: 账号  
 *        - name: password
 *          required: true
 *          schema:
 *              type: string
 *          description: 密码   
 *     responses:  
 *       200:  
 *         description: 注册成功
 *         schema:  
 *           type: object  
 *           properties:  
 *             data:  
 *               type: object  
 *               example: {
 *                userDate: "2024-02-08T16:21:27.955Z",userImg:"/images/default.jpg",username:"admin",_id:"65c4ff87e28e2945216e16e6"}
 *       400: 
 *          description: 账号已存在
 *              
 *       500:  
 *         description: 服务器错误  
 */
router.post('/reg', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const res = await User.findOne({ username })
  if (res) {
    ctx.body = util.fail('账号已存在')
    return
  }

  await User.create({
    username,
    password,
    userDate: Date.now(),
    userImg: '/images/default.jpg' // public文件夹
  })
  ctx.body = util.success('注册成功')
})

// 登录
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const res = await User.findOne({ username, password }, 'username userDate userImg')
  if (res) {
    const data = res._doc
    let tokenData = util.setToken(data)
    data.token = tokenData
    ctx.body = { code: 200, data, message: '登录成功' }
    return res
  } else {
    return ctx.body = { code: 400, data: {}, message: '账号或密码错误' }

  }

})


// token
router.get('/token', async function (ctx, next) {

  if (ctx.request.headers.authorization) {
    const header = ctx.request.headers.authorization
    const data = await util.verifyToken(header)

    ctx.body = util.success(data, 'token请求成功')
  }
  else {
    console.log(666);
  }
})


// 修改头像
router.post('/avatar', async function (ctx, next) {
  // 检查是否有文件上传  
  const file = ctx.request.files.file;
  if (!file) return ctx.body = util.fail({}, '请上传头像')
  // 有文件上传则修改文件
  const { id } = ctx.request.body
  const res = await User.findById(id)

  if (res.userImg !== '/images/default.jpg') {
    // 删除上一个
    fs.unlinkSync("./public" + res.userImg)
  }

  const savefilePath = path.join(__dirname, '../public/images', file.newFilename); // 文件保存路径 
  const url = savefilePath.split('public')[1]
  const reader = fs.createReadStream(file.filepath); // 创建可读流来读取上传的文件  
  const writer = fs.createWriteStream(savefilePath); // 创建可写流来写入文件到服务器  

  reader.pipe(writer); // 将可读流导入可写流  

  return new Promise((resolve, reject) => {
    writer.on('finish', async () => {

      // 更新头像
      await User.updateOne({ _id: id }, { userImg: url })
      // 更新token
      const data = res._doc
      data.userImg = url
      let tokenData = util.setToken({ token: data })
      data.token = tokenData
      // 文件保存成功  
      ctx.body = util.success(data, '头像修改成功')
      resolve();
    })

    writer.on('error', (err) => {
      // 文件保存失败  
      // ctx.status = 500;
      ctx.body = util.fail('头像修改失败', 500)
      reject(err);
    });
  });
})

module.exports = router
