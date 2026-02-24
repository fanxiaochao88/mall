/**
 * 管理端路由
 */

let users = []
let merchants = []
let userIdCounter = 1
let merchantIdCounter = 1

export function setupAdminRoutes(server) {
  // ==================== 管理员认证 ====================

  server.post('/api/v1/admin/login', (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: '请输入用户名和密码',
        data: null
      })
    }
    
    const admin = {
      id: 1,
      username,
      name: '管理员',
      phone: '13700137000',
      email: 'admin@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
      role: 'admin',
      status: 'normal',
      created_at: '2024-01-01T00:00:00Z'
    }
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        access_token: 'admin_token_' + Date.now(),
        token_type: 'Bearer',
        admin
      }
    })
  })

  server.get('/api/v1/admin/me', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: {
        id: 1,
        username: 'admin',
        name: '管理员',
        phone: '13700137000',
        email: 'admin@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      }
    })
  })

  // ==================== 用户管理 ====================

  server.get('/api/v1/admin/users', (req, res) => {
    const { page = 1, page_size = 20, status, keyword } = req.query
    
    const mockUsers = [
      {
        id: 1,
        username: 'user01',
        phone: '13800138000',
        email: 'user@example.com',
        nickname: '测试用户',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        username: 'user02',
        phone: '13800138001',
        email: 'user2@example.com',
        nickname: '用户2',
        status: 'normal',
        created_at: '2024-01-02T00:00:00Z'
      }
    ]
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: mockUsers.length,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: mockUsers
      }
    })
  })

  server.put('/api/v1/admin/users/:id/status', (req, res) => {
    const { status } = req.body
    
    res.json({
      code: 200,
      message: '状态更新成功',
      data: {
        id: parseInt(req.params.id),
        status
      }
    })
  })

  // ==================== 商家管理 ====================

  server.get('/api/v1/admin/merchants', (req, res) => {
    const { page = 1, page_size = 20, status } = req.query
    
    const mockMerchants = [
      {
        id: 1,
        username: 'merchant01',
        shop_name: '测试商家',
        phone: '13900139000',
        email: 'merchant@example.com',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        username: 'merchant02',
        shop_name: '商家2',
        phone: '13900139001',
        email: 'merchant2@example.com',
        status: 'normal',
        created_at: '2024-01-02T00:00:00Z'
      }
    ]
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: mockMerchants.length,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: mockMerchants
      }
    })
  })

  server.post('/api/v1/admin/merchants', (req, res) => {
    const merchant = {
      id: merchantIdCounter++,
      ...req.body,
      status: 'normal',
      created_at: new Date().toISOString()
    }
    
    merchants.push(merchant)
    res.json({ code: 200, message: '添加成功', data: merchant })
  })

  server.put('/api/v1/admin/merchants/:id/status', (req, res) => {
    const { status } = req.body
    
    res.json({
      code: 200,
      message: '状态更新成功',
      data: {
        id: parseInt(req.params.id),
        status
      }
    })
  })

  // ==================== 分类管理 ====================

  server.get('/api/v1/admin/categories', (req, res) => {
    const categories = [
      { id: 1, parent_id: null, name: '手机数码', icon: '📱', sort_order: 1 },
      { id: 2, parent_id: null, name: '电脑办公', icon: '💻', sort_order: 2 },
      { id: 3, parent_id: null, name: '家用电器', icon: '🏠', sort_order: 3 }
    ]
    
    res.json({ code: 200, message: '成功', data: categories })
  })

  server.post('/api/v1/admin/categories', (req, res) => {
    const category = {
      id: Date.now(),
      ...req.body,
      created_at: new Date().toISOString()
    }
    
    res.json({ code: 200, message: '添加成功', data: category })
  })

  // ==================== 数据统计 ====================

  server.get('/api/v1/admin/statistics', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: {
        total_users: 1000,
        total_merchants: 50,
        total_orders: 5000,
        total_sales: 1000000,
        today_users: 10,
        today_merchants: 2,
        today_orders: 50,
        today_sales: 50000
      }
    })
  })
}
