/**
 * 用户端路由
 */

// 内存数据存储
let cartItems = []
let orders = []
let addresses = [
  {
    id: 1,
    user_id: 1,
    receiver_name: '张三',
    receiver_phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: 'xxx街道xxx号',
    is_default: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

let cartIdCounter = 1
let orderIdCounter = 1
let addressIdCounter = 2

export function setupUserRoutes(server) {
  // ==================== 用户认证模块 ====================

  // 用户注册
  server.post('/api/v1/user/users/register', (req, res) => {
    const { username, phone, password, code } = req.body
    
    if (!username || !phone || !password || !code) {
      return res.status(400).json({
        code: 400,
        message: '请填写完整信息',
        data: null
      })
    }
    
    if (code !== '1234') {
      return res.status(400).json({
        code: 400,
        message: '验证码错误',
        data: null
      })
    }
    
    const user = {
      id: Date.now(),
      username,
      phone,
      email: req.body.email || null,
      avatar: null,
      nickname: username,
      status: 'normal',
      created_at: new Date().toISOString()
    }
    
    res.status(201).json({
      code: 201,
      message: '注册成功',
      data: user
    })
  })

  // 发送验证码
  server.post('/api/v1/user/users/send-code', (req, res) => {
    const { phone } = req.body
    
    if (!phone) {
      return res.status(400).json({
        code: 400,
        message: '请输入手机号',
        data: null
      })
    }
    
    res.json({
      code: 200,
      message: '验证码已发送,测试码: 1234',
      data: null
    })
  })

  // 用户登录
  server.post('/api/v1/user/users/login', (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: '请输入用户名和密码',
        data: null
      })
    }
    
    const user = {
      id: 1,
      username,
      phone: '13800138000',
      email: 'user@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
      nickname: username,
      status: 'normal',
      created_at: '2024-01-01T00:00:00Z'
    }
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        access_token: 'user_token_' + Date.now(),
        token_type: 'Bearer',
        user
      }
    })
  })

  // 获取当前用户信息
  server.get('/api/v1/user/users/me', (req, res) => {
    res.json({
      code: 200,
      message: '成功',
      data: {
        id: 1,
        username: 'testuser',
        phone: '13800138000',
        email: 'user@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
        nickname: '测试用户',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      }
    })
  })

  // 更新用户信息
  server.put('/api/v1/user/users/me', (req, res) => {
    const { nickname, avatar, email } = req.body
    
    res.json({
      code: 200,
      message: '更新成功',
      data: {
        id: 1,
        username: 'testuser',
        phone: '13800138000',
        email: email || 'user@example.com',
        avatar: avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
        nickname: nickname || '测试用户',
        status: 'normal',
        created_at: '2024-01-01T00:00:00Z'
      }
    })
  })

  // ==================== 商品模块 ====================

  server.get('/api/v1/user/categories', (req, res) => {
    const categories = [
      { id: 1, parent_id: null, name: '手机数码', icon: '📱', sort_order: 1, children: [
        { id: 11, parent_id: 1, name: '手机', icon: '📱', sort_order: 1 },
        { id: 12, parent_id: 1, name: '平板', icon: '📱', sort_order: 2 }
      ]},
      { id: 2, parent_id: null, name: '电脑办公', icon: '💻', sort_order: 2, children: [
        { id: 21, parent_id: 2, name: '笔记本', icon: '💻', sort_order: 1 },
        { id: 22, parent_id: 2, name: '台式机', icon: '🖥️', sort_order: 2 }
      ]},
      { id: 3, parent_id: null, name: '家用电器', icon: '🏠', sort_order: 3, children: [
        { id: 31, parent_id: 3, name: '电视', icon: '📺', sort_order: 1 },
        { id: 32, parent_id: 3, name: '冰箱', icon: '❄️', sort_order: 2 }
      ]}
    ]
    
    res.json({ code: 200, message: '成功', data: categories })
  })

  server.get('/api/v1/user/banners', (req, res) => {
    const banners = [
      { id: 1, title: '新品上市', image: 'https://picsum.photos/1200/400?random=1', link: '/products?category=1', sort_order: 1, status: 'active' },
      { id: 2, title: '限时优惠', image: 'https://picsum.photos/1200/400?random=2', link: '/products?category=2', sort_order: 2, status: 'active' },
      { id: 3, title: '热销推荐', image: 'https://picsum.photos/1200/400?random=3', link: '/products?category=3', sort_order: 3, status: 'active' },
      { id: 4, title: '热销推荐', image: 'https://picsum.photos/1200/400?random=4', link: '/products?category=4', sort_order: 4, status: 'active' }
    ]
    
    res.json({ code: 200, message: '成功', data: banners })
  })

  server.get('/api/v1/user/products', (req, res) => {
    const { page = 1, page_size = 20 } = req.query
    
    const products = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `商品名称 ${i + 1}`,
      image: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
      min_price: (i + 1) * 10000,
      max_price: (i + 1) * 15000,
      sales: Math.floor(Math.random() * 1000),
      merchant_id: Math.floor(Math.random() * 5) + 1,
      merchant_name: `商家${Math.floor(Math.random() * 5) + 1}`
    }))
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: 100,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: products
      }
    })
  })

  server.get('/api/v1/user/products/:id', (req, res) => {
    const { id } = req.params
    
    const product = {
      id: parseInt(id),
      merchant_id: 1,
      merchant_name: '测试商家',
      category_id: 1,
      category_name: '手机',
      name: '测试商品 ' + id,
      description: '这是一个测试商品的详细描述信息...',
      images: [
        `https://via.placeholder.com/600/4299E1/FFFFFF?text=Image+1`,
        `https://via.placeholder.com/600/48BB78/FFFFFF?text=Image+2`,
        `https://via.placeholder.com/600/ED8936/FFFFFF?text=Image+3`
      ],
      video: null,
      status: 'on_sale',
      sales: 999,
      created_at: '2024-01-01T00:00:00Z',
      skus: [
        { id: 1, sku_name: '默认', price: 299900, stock: 100, image: null, attributes: { color: '黑色', memory: '128G' } },
        { id: 2, sku_name: '白色 256G', price: 349900, stock: 50, image: null, attributes: { color: '白色', memory: '256G' } }
      ]
    }
    
    res.json({ code: 200, message: '成功', data: product })
  })

  // ==================== 购物车模块 ====================

  server.get('/api/v1/user/carts', (req, res) => {
    res.json({ code: 200, message: '成功', data: cartItems })
  })

  server.post('/api/v1/user/carts', (req, res) => {
    const { sku_id, quantity } = req.body
    
    const item = {
      id: cartIdCounter++,
      user_id: 1,
      sku_id,
      quantity,
      created_at: new Date().toISOString(),
      product: {
        id: 1,
        name: '测试商品',
        image: 'https://via.placeholder.com/100/4299E1/FFFFFF?text=Product',
        status: 'on_sale'
      },
      sku: {
        id: sku_id,
        sku_name: '默认',
        price: 299900,
        stock: 100,
        attributes: { color: '黑色', memory: '128G' }
      },
      merchant: {
        id: 1,
        shop_name: '测试商家'
      },
      subtotal: 299900 * quantity,
      is_valid: true
    }
    
    cartItems.push(item)
    res.json({ code: 200, message: '添加成功', data: item })
  })

  server.put('/api/v1/user/carts/:id', (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
    
    const item = cartItems.find(item => item.id === parseInt(id))
    if (item) {
      item.quantity = quantity
      item.subtotal = item.sku.price * quantity
    }
    
    res.json({ code: 200, message: '更新成功', data: item })
  })

  server.delete('/api/v1/user/carts/:id', (req, res) => {
    const { id } = req.params
    cartItems = cartItems.filter(item => item.id !== parseInt(id))
    res.json({ code: 200, message: '删除成功', data: null })
  })

  server.post('/api/v1/user/carts/batch-delete', (req, res) => {
    const { ids } = req.body
    cartItems = cartItems.filter(item => !ids.includes(item.id))
    res.json({ code: 200, message: '删除成功', data: null })
  })

  // ==================== 订单模块 ====================

  server.post('/api/v1/user/orders', (req, res) => {
    const { items, address_id, remark } = req.body
    
    const order = {
      id: orderIdCounter++,
      order_no: 'O' + Date.now(),
      user_id: 1,
      merchant_id: 1,
      merchant_name: '测试商家',
      receiver_name: '张三',
      receiver_phone: '13800138000',
      receiver_address: '北京市朝阳区xxx街道xxx号',
      total_amount: 299900,
      freight: 0,
      discount_amount: 0,
      actual_amount: 299900,
      status: 'pending_payment',
      remark: remark || null,
      created_at: new Date().toISOString(),
      items: items.map((item, index) => ({
        id: index + 1,
        order_id: orderIdCounter,
        product_id: 1,
        sku_id: item.sku_id,
        product_name: '测试商品',
        sku_name: '默认',
        image: 'https://via.placeholder.com/100',
        price: 299900,
        quantity: item.quantity,
        subtotal: 299900 * item.quantity
      }))
    }
    
    orders.push(order)
    res.json({ code: 200, message: '订单创建成功', data: order })
  })

  server.get('/api/v1/user/orders', (req, res) => {
    const { page = 1, page_size = 10, status } = req.query
    
    let filteredOrders = orders
    if (status) {
      filteredOrders = orders.filter(o => o.status === status)
    }
    
    res.json({
      code: 200,
      message: '成功',
      data: {
        total: filteredOrders.length,
        page: parseInt(page),
        page_size: parseInt(page_size),
        items: filteredOrders
      }
    })
  })

  server.get('/api/v1/user/orders/:id', (req, res) => {
    const { id } = req.params
    const order = orders.find(o => o.id === parseInt(id))
    
    if (!order) {
      return res.status(404).json({ code: 404, message: '订单不存在', data: null })
    }
    
    res.json({ code: 200, message: '成功', data: order })
  })

  server.post('/api/v1/user/orders/:id/pay', (req, res) => {
    const { id } = req.params
    const order = orders.find(o => o.id === parseInt(id))
    
    if (order) {
      order.status = 'pending_shipment'
      order.paid_at = new Date().toISOString()
    }
    
    res.json({ code: 200, message: '支付成功', data: order })
  })

  server.post('/api/v1/user/orders/:id/cancel', (req, res) => {
    const { id } = req.params
    const order = orders.find(o => o.id === parseInt(id))
    
    if (order) {
      order.status = 'cancelled'
    }
    
    res.json({ code: 200, message: '订单已取消', data: order })
  })

  server.post('/api/v1/user/orders/:id/confirm', (req, res) => {
    const { id } = req.params
    const order = orders.find(o => o.id === parseInt(id))
    
    if (order) {
      order.status = 'completed'
      order.completed_at = new Date().toISOString()
    }
    
    res.json({ code: 200, message: '确认收货成功', data: order })
  })

  // ==================== 收货地址模块 ====================

  // 获取收货地址列表
  server.get('/api/v1/user/addresses', (req, res) => {
    res.json({ code: 200, message: '成功', data: addresses })
  })

  // 添加收货地址
  server.post('/api/v1/user/addresses', (req, res) => {
    const address = {
      id: addressIdCounter++,
      user_id: 1,
      ...req.body,
      created_at: new Date().toISOString()
    }
    
    if (address.is_default) {
      addresses.forEach(addr => addr.is_default = false)
    }
    
    addresses.push(address)
    res.json({ code: 200, message: '添加成功', data: address })
  })

  // 更新收货地址
  server.put('/api/v1/user/addresses/:id', (req, res) => {
    const { id } = req.params
    const index = addresses.findIndex(addr => addr.id === parseInt(id))
    
    if (index !== -1) {
      if (req.body.is_default) {
        addresses.forEach(addr => addr.is_default = false)
      }
      addresses[index] = { ...addresses[index], ...req.body }
    }
    
    res.json({ code: 200, message: '更新成功', data: addresses[index] })
  })

  // 删除收货地址
  server.delete('/api/v1/user/addresses/:id', (req, res) => {
    const { id } = req.params
    addresses = addresses.filter(addr => addr.id !== parseInt(id))
    res.json({ code: 200, message: '删除成功', data: null })
  })

  // 设置默认收货地址
  server.post('/api/v1/user/addresses/:id/set-default', (req, res) => {
    const { id } = req.params
    addresses.forEach(addr => {
      addr.is_default = addr.id === parseInt(id)
    })
    
    const address = addresses.find(addr => addr.id === parseInt(id))
    res.json({ code: 200, message: '设置成功', data: address })
  })

  // ==================== 文件上传 ====================

  server.post('/api/v1/user/upload/image', (req, res) => {
    res.json({
      code: 200,
      message: '上传成功',
      data: {
        url: 'https://via.placeholder.com/300/4299E1/FFFFFF?text=Uploaded+Image'
      }
    })
  })
}
