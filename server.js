const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// 重写路由
server.use(jsonServer.rewriter({
  '/blog/:resource/:id/show': '/:resource/:id',
  '/api/DeviceType/:C/zh-cn': '/DeviceType',
  '/api/Branch/:id/:false':'/Branch',
  '/api/Menus/:id/C/zh-cn':'/Menus',
  '/api/HardwareType/C/zh-cn':'/HardwareType',
  '/api/MenuGroup/:id/:C/:BZ/zh-cn':'/MenuGroup',
  '/api/Menus/:id/C/ZH/zh-cn/:id':'/Menus_Grouped',
  '/api/*': '/$1',
}))


// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})