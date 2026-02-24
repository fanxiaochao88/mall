/**
 * 商家端路由
 */

let products = []
let productIdCounter = 1

export function setupMerchantRoutes(server) {
  // ==================== 商家认证 ====================

  server.post('/api/v1/merchant/login', (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: '请输入用户名和密码',
        data: null
      })
    }
    
    const merchant = {
      id: 1,
      username,
      shop_name: '测试商家',
      phone: '13900139000',
      email: 'merchant@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
      status: 'normal',
      created_at: '2024-01-01T00:00:00Z'
    }
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        access_token: 'merchant_token_' + Date.now(),
        token_type: 'Bearer',
        merchant
      }
    })
  })

  server.get('/api/v1/merchant/me', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: {
        id: 1,
        username: 'merchant01',
        shop_name: '测试商家',
        phone: '13900139000',
        email: 'merchant@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=merchant',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      }
    })
  })

  // ==================== 商品管理 ====================

  server.get('/api/v1/merchant/products', (req, res) => {
    const { page = 1, page_size = 20, status } = req.query
    
    let filteredProducts = products
    if (status) {
      filteredProducts = products.filter(p => p.status === status)
    }
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: filteredProducts.length,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: filteredProducts
      }
    })
  })

  server.post('/api/v1/merchant/products', (req, res) => {
    const product = {
      id: productIdCounter++,
      merchant_id: 1,
      ...req.body,
      status: 'on_sale',
      sales: 0,
      created_at: new Date().toISOString()
    }
    
    products.push(product)
    res.json({ code: 200, message: '添加成功', data: product })
  })

  server.put('/api/v1/merchant/products/:id', (req, res) => {
    const { id } = req.params
    const index = products.findIndex(p => p.id === parseInt(id))
    
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body }
    }
    
    res.json({ code: 200, message: '更新成功', data: products[index] })
  })

  server.delete('/api/v1/merchant/products/:id', (req, res) => {
    const { id } = req.params
    products = products.filter(p => p.id !== parseInt(id))
    res.json({ code: 200, message: '删除成功', data: null })
  })

  // ==================== 订单管理 ====================

  server.get('/api/v1/merchant/orders', (req, res) => {
    const { page = 1, page_size = 20, status } = req.query
    
    const mockOrders = [
      {
        id: 1,
        order_no: 'O' + Date.now(),
        user_id: 1,
        receiver_name: '张三',
        receiver_phone: '13800138000',
        receiver_address: '北京市朝阳区xxx街道xxx号',
        total_amount: 299900,
        status: 'pending_shipment',
        created_at: new Date().toISOString()
      }
    ]
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: mockOrders.length,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: mockOrders
      }
    })
  })

  server.post('/api/v1/merchant/orders/:id/ship', (req, res) => {
    const { logistics_company, logistics_no } = req.body
    
    res.json({
      code: 200,
      message: '发货成功',
      data: {
        id: req.params.id,
        status: 'shipped',
        logistics_company,
        logistics_no,
        shipped_at: new Date().toISOString()
      }
    })
  })

  // ==================== 数据统计 ====================

  server.get('/api/v1/merchant/statistics', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: {
        today_orders: 10,
        today_sales: 100000,
        pending_orders: 5,
        total_products: products.length
      }
    })
  })
}
