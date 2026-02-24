/**
 * Mock服务器 - 支持用户端、商家端、管理端三端接口
 * 基于json-server + 自定义中间件
 */
import jsonServer from 'json-server'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { setupUserRoutes } from './routes/user-routes.js'
import { setupMerchantRoutes } from './routes/merchant-routes.js'
import { setupAdminRoutes } from './routes/admin-routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// 启用CORS
server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)

// 模拟延迟
server.use((req, res, next) => {
  setTimeout(next, 300) // 300ms延迟
})

// Token验证中间件
const authPaths = {
  user: ['/api/v1/user/users/me', '/api/v1/user/carts', '/api/v1/user/orders', '/api/v1/user/addresses'],
  merchant: ['/api/v1/merchant/me', '/api/v1/merchant/products', '/api/v1/merchant/orders'],
  admin: ['/api/v1/admin/me', '/api/v1/admin/users', '/api/v1/admin/merchants', '/api/v1/admin/categories']
}

server.use((req, res, next) => {
  // 检查是否需要认证
  const needsAuth = Object.values(authPaths).flat().some(path => req.path.startsWith(path))
  
  if (needsAuth) {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: '未认证,请先登录',
        data: null
      })
    }
  }
  next()
})

// 设置各端路由
setupUserRoutes(server)
setupMerchantRoutes(server)
setupAdminRoutes(server)

// 使用默认路由（用于其他json-server功能）
server.use('/api/v1', router)

// 启动服务器
const PORT = 3000
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         🚀 Mock服务器已启动 - 三端支持                    ║
╟────────────────────────────────────────────────────────────╢
║  📍 地址: http://localhost:${PORT}                          ║
║  📚 文档: http://localhost:${PORT}/api/v1                   ║
╟────────────────────────────────────────────────────────────╢
║  🔵 用户端接口: /api/v1/user/*                             ║
║     - POST /api/v1/user/users/register                     ║
║     - POST /api/v1/user/users/login                        ║
║     - GET  /api/v1/user/products                           ║
║     - GET  /api/v1/user/carts                              ║
║     - GET  /api/v1/user/orders                             ║
╟────────────────────────────────────────────────────────────╢
║  🟢 商家端接口: /api/v1/merchant/*                         ║
║     - POST /api/v1/merchant/login                          ║
║     - GET  /api/v1/merchant/products                       ║
║     - POST /api/v1/merchant/products                       ║
║     - GET  /api/v1/merchant/orders                         ║
╟────────────────────────────────────────────────────────────╢
║  🟠 管理端接口: /api/v1/admin/*                            ║
║     - POST /api/v1/admin/login                             ║
║     - GET  /api/v1/admin/users                             ║
║     - GET  /api/v1/admin/merchants                         ║
║     - GET  /api/v1/admin/statistics                        ║
╟────────────────────────────────────────────────────────────╢
║  💡 测试说明:                                              ║
║     - 验证码统一: 1234                                     ║
║     - 任意用户名密码都可登录                               ║
║     - Token: 登录后返回,请求需认证接口时携带              ║
╚════════════════════════════════════════════════════════════╝
  `)
})
