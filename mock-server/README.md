# Mock服务器 - 三端接口支持

基于json-server的Mock API服务器,支持用户端、商家端、管理端三个端的所有接口模拟数据。

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动服务器
```bash
npm start
```

或使用热重载:
```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

## API接口

### 🔵 用户端接口 `/api/v1/user/*`

#### 用户认证
- `POST /api/v1/user/users/register` - 用户注册
- `POST /api/v1/user/users/send-code` - 发送验证码 (测试码: 1234)
- `POST /api/v1/user/users/login` - 用户登录
- `GET /api/v1/user/users/me` - 获取当前用户 (需要token)
- `PUT /api/v1/user/users/me` - 更新用户信息

#### 商品模块
- `GET /api/v1/user/categories` - 获取分类
- `GET /api/v1/user/banners` - 获取轮播图
- `GET /api/v1/user/products` - 获取商品列表
- `GET /api/v1/user/products/:id` - 获取商品详情

#### 购物车
- `GET /api/v1/user/carts` - 获取购物车
- `POST /api/v1/user/carts` - 添加到购物车
- `PUT /api/v1/user/carts/:id` - 更新数量
- `DELETE /api/v1/user/carts/:id` - 删除商品
- `POST /api/v1/user/carts/batch-delete` - 批量删除

#### 订单
- `POST /api/v1/user/orders` - 创建订单
- `GET /api/v1/user/orders` - 获取订单列表
- `GET /api/v1/user/orders/:id` - 获取订单详情
- `POST /api/v1/user/orders/:id/pay` - 支付订单
- `POST /api/v1/user/orders/:id/cancel` - 取消订单
- `POST /api/v1/user/orders/:id/confirm` - 确认收货

#### 收货地址
- `GET /api/v1/user/addresses` - 获取地址列表
- `POST /api/v1/user/addresses` - 创建地址
- `PUT /api/v1/user/addresses/:id` - 更新地址
- `DELETE /api/v1/user/addresses/:id` - 删除地址
- `POST /api/v1/user/addresses/:id/set-default` - 设置默认地址

#### 文件上传
- `POST /api/v1/user/upload/image` - 上传图片

### 🟢 商家端接口 `/api/v1/merchant/*`

#### 商家认证
- `POST /api/v1/merchant/login` - 商家登录
- `GET /api/v1/merchant/me` - 获取商家信息

#### 商品管理
- `GET /api/v1/merchant/products` - 获取商品列表
- `POST /api/v1/merchant/products` - 添加商品
- `PUT /api/v1/merchant/products/:id` - 更新商品
- `DELETE /api/v1/merchant/products/:id` - 删除商品

#### 订单管理
- `GET /api/v1/merchant/orders` - 获取订单列表
- `POST /api/v1/merchant/orders/:id/ship` - 发货

#### 数据统计
- `GET /api/v1/merchant/statistics` - 获取统计数据

### 🟠 管理端接口 `/api/v1/admin/*`

#### 管理员认证
- `POST /api/v1/admin/login` - 管理员登录
- `GET /api/v1/admin/me` - 获取管理员信息

#### 用户管理
- `GET /api/v1/admin/users` - 获取用户列表
- `PUT /api/v1/admin/users/:id/status` - 更新用户状态

#### 商家管理
- `GET /api/v1/admin/merchants` - 获取商家列表
- `POST /api/v1/admin/merchants` - 添加商家
- `PUT /api/v1/admin/merchants/:id/status` - 更新商家状态

#### 分类管理
- `GET /api/v1/admin/categories` - 获取分类列表
- `POST /api/v1/admin/categories` - 添加分类

#### 数据统计
- `GET /api/v1/admin/statistics` - 获取统计数据

## 测试说明

### 验证码
所有验证码统一为: `1234`

### 登录
任意用户名 + 任意密码都可以登录成功

### Token
登录后会返回token,请求需要认证的接口时带上:
```
Authorization: Bearer {token}
```

## 特性

- ✅ 三端完整接口模拟 (用户端、商家端、管理端)
- ✅ 路由模块化设计
- ✅ Token验证
- ✅ CORS支持
- ✅ 300ms延迟模拟
- ✅ 完整的业务逻辑
- ✅ 错误处理

## 项目结构

```
mock-server/
├── routes/
│   ├── user-routes.js      # 用户端路由
│   ├── merchant-routes.js  # 商家端路由
│   └── admin-routes.js     # 管理端路由
├── server-new.js           # 新版服务器(推荐)
├── server.js               # 旧版服务器
├── db.json                 # JSON数据库
├── package.json
└── README.md
```
