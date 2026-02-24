# 接口文档总览

## 📌 文档说明
本目录包含商城项目三端(用户端、商家端、管理端)的完整接口文档,用于前端开发时Mock数据和后端开发时API实现。

---

## 📂 文档列表

### 1. [用户端接口文档](./用户端接口文档.md)
**适用**: 用户端(C端)前端开发

**包含模块**:
- ✅ 用户认证(注册、登录、个人信息)
- ✅ 商品浏览(列表、详情、分类、搜索)
- ✅ 购物车(增删改查)
- ✅ 订单(创建、支付、查询、状态流转)
- ✅ 收货地址(CRUD)
- ✅ 文件上传

**接口数量**: 约30个

---

### 2. [商家端接口文档](./商家端接口文档.md)
**适用**: 商家端(B端)前端开发

**包含模块**:
- ✅ 商家认证(注册、登录、店铺管理)
- ✅ 商品管理(发布、编辑、上下架、库存)
- ✅ 订单管理(查询、发货、退款处理)
- ✅ 数据统计(销售统计、商品排行)
- ✅ 文件上传

**接口数量**: 约25个

---

### 3. [管理端接口文档](./管理端接口文档.md)
**适用**: 管理端(Admin)前端开发

**包含模块**:
- ✅ 管理员认证(登录、密码修改)
- ✅ 商家管理(审核、禁用)
- ✅ 商品管理(审核、下架)
- ✅ 用户管理(查看、禁用)
- ✅ 订单管理(查看、监控)
- ✅ 分类管理(CRUD)
- ✅ 轮播图管理(CRUD)
- ✅ 管理员管理(CRUD)
- ✅ 数据统计(平台概览、销售统计、排行榜)

**接口数量**: 约35个

---

## 🎯 接口设计原则

### 1. RESTful规范
- 使用HTTP方法表示操作: GET(查询)、POST(创建)、PUT(更新)、DELETE(删除)
- URL表示资源: `/api/v1/products`
- 使用复数名词: `products`, `orders`, `users`

### 2. 统一响应格式
```typescript
interface Response<T> {
  code: number;        // 200成功, 400参数错误, 401未认证, 403无权限, 404不存在, 500服务器错误
  message: string;     // 提示信息
  data: T | null;      // 响应数据
}
```

### 3. 统一认证方式
```http
Authorization: Bearer {token}
```

### 4. 分页规范
```typescript
// 请求参数
{
  page: number;        // 页码, 从1开始
  page_size: number;   // 每页数量, 默认20
}

// 响应格式
{
  total: number;       // 总数
  page: number;
  page_size: number;
  items: T[];
}
```

---

## 🔗 接口基础URL

### 开发环境(Mock)
```
用户端: http://localhost:3000/api/v1
商家端: http://localhost:3001/api/v1
管理端: http://localhost:3002/api/v1
```

### 生产环境
```
用户端: https://api.yourdomain.com/api/v1
商家端: https://merchant-api.yourdomain.com/api/v1
管理端: https://admin-api.yourdomain.com/api/v1
```

---

## 📊 接口统计

| 端 | 模块数 | 接口数 | 优先级P0 | 优先级P1 | 优先级P2 |
|----|--------|--------|----------|----------|----------|
| **用户端** | 6 | ~30 | 25 | 3 | 2 |
| **商家端** | 5 | ~25 | 20 | 3 | 2 |
| **管理端** | 9 | ~35 | 30 | 3 | 2 |
| **合计** | 20 | ~90 | 75 | 9 | 6 |

---

## 🚀 快速开始

### 1. 前端开发使用

#### Step 1: 启动Mock服务
```bash
cd mock-server
npm install
node server.js
```

#### Step 2: 配置前端API基础URL
```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

#### Step 3: 查看接口文档,开始开发
```typescript
// 示例: 调用登录接口
import request from '@/api/request';

const login = async (username: string, password: string) => {
  const response = await request.post('/users/login', {
    username,
    password
  });
  return response.data;
};
```

---

### 2. 后端开发使用

#### Step 1: 查看接口文档,了解接口定义

#### Step 2: 实现API接口
```python
# app/api/v1/user.py
from fastapi import APIRouter, Depends
from app.schemas.user import UserLogin, LoginResponse

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    # 实现登录逻辑
    pass
```

#### Step 3: 确保响应格式与文档一致

---

## 📝 接口开发检查清单

### 前端开发
- [ ] 查看接口文档,了解请求参数和响应格式
- [ ] 定义TypeScript类型
- [ ] 封装API调用函数
- [ ] 准备Mock数据
- [ ] 实现页面逻辑
- [ ] 测试接口调用

### 后端开发
- [ ] 查看接口文档,了解业务需求
- [ ] 定义Pydantic Schema
- [ ] 实现CRUD操作
- [ ] 实现业务逻辑
- [ ] 编写单元测试
- [ ] 测试接口

---

## 🔄 接口状态流转

### 订单状态
```
pending_payment → (支付) → pending_shipment → (发货) → shipped → (确认收货) → completed
       ↓                         ↓                        ↓
   cancelled                 refunding                refunding
                                 ↓                        ↓
                             refunded                 refunded
```

### 商家状态
```
pending → (审核通过) → approved → (违规) → disabled
        ↓
    rejected
```

### 商品状态
```
pending → (审核通过) → approved ⇄ (上下架) ⇄ offline
        ↓
    rejected
```

---

## 🎨 Mock数据规范

### 1. 数据真实性
使用 `@faker-js/faker` 生成真实感的测试数据:
```typescript
import { faker } from '@faker-js/faker';

const user = {
  id: 1,
  username: faker.internet.userName(),
  phone: faker.phone.number('138########'),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  nickname: faker.person.fullName(),
};
```

### 2. 数据一致性
Mock数据必须与数据库设计完全一致:
```typescript
// ✅ 正确: 字段名与数据库一致
interface Product {
  id: number;
  name: string;           // 数据库字段是name
  merchant_id: number;
}

// ❌ 错误: 字段名不一致
interface Product {
  id: number;
  title: string;          // 数据库字段是name,不是title!
}
```

### 3. 业务逻辑对齐
Mock数据的状态流转要与后端业务逻辑一致。

---

## 🔐 认证与权限

### Token格式
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token payload
```json
{
  "sub": "1",              // 用户/商家/管理员ID
  "role": "user",          // 角色: user, merchant, admin
  "exp": 1708761600        // 过期时间
}
```

### 权限验证
```typescript
// 前端路由守卫
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    next('/login');
  } else {
    next();
  }
};
```

---

## 📞 常见问题

### Q1: 接口返回401怎么办?
**A**: Token过期或无效,需要重新登录。

### Q2: 如何处理文件上传?
**A**: 使用 `multipart/form-data` 格式,参考各端接口文档的文件上传章节。

### Q3: 分页参数如何传递?
**A**: 使用查询参数 `?page=1&page_size=20`。

### Q4: 如何Mock复杂的业务逻辑?
**A**: 在Mock服务器中添加自定义中间件,实现业务逻辑。

### Q5: 前后端数据格式不一致怎么办?
**A**: 严格按照接口文档开发,如有问题及时沟通调整文档。

---

## 📚 相关文档

- [04-后端设计文档](../04-后端设计文档.md) - 了解后端业务逻辑
- [05-数据库设计文档](../05-数据库设计文档.md) - 了解数据结构
- [06-接口设计规范](../06-接口设计规范.md) - 了解接口设计规范
- [08-开工指南](../08-开工指南.md) - 了解开发流程

---

## 🎯 下一步

1. **前端开发**: 查看对应端的接口文档,开始Mock数据和页面开发
2. **后端开发**: 查看接口文档,实现API接口
3. **联调测试**: 前后端联调,确保接口一致

**祝开发顺利!** 🚀
