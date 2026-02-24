# 🛒 Mall 电商系统

一个功能完整的多端电商系统，包含用户端、商家端、管理端三个前端应用和统一的后端服务。

## 📁 项目结构

```
mall/
├── docs/                          # 📚 项目文档
│   ├── 00-项目总览与任务计划表.md
│   ├── 01-需求分析文档.md
│   ├── 02-技术架构设计文档.md
│   ├── 03-前端设计文档/
│   │   ├── 03-1-用户端设计.md
│   │   ├── 03-2-商家端设计.md
│   │   └── 03-3-管理端设计.md
│   └── 09-接口文档/
│       ├── 用户端接口文档.md
│       ├── 商家端接口文档.md
│       └── 管理端接口文档.md
│
├── frontend/                      # 💻 前端项目
│   ├── user-app/                  # 🔵 用户端 (C端)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── merchant-app/              # 🟢 商家端 (B端) - 待开发
│   └── admin-app/                 # 🟠 管理端 - 待开发
│
├── backend/                       # 🐍 后端服务 (Python)
│   ├── app/                       # 应用代码 - 待开发
│   ├── requirements.txt           # Python依赖
│   └── README.md
│
├── mock-server/                   # 🌐 Mock API服务器
│   ├── routes/                    # 路由模块
│   │   ├── user-routes.js         # 用户端接口
│   │   ├── merchant-routes.js     # 商家端接口
│   │   └── admin-routes.js        # 管理端接口
│   ├── server-new.js              # 服务器入口
│   ├── db.json                    # JSON数据库
│   └── package.json
│
├── .gitignore                     # Git忽略配置
└── README.md                      # 项目说明文档
```

## 🚀 技术栈

### 前端
- **用户端**: React 19 + TypeScript + Vite + Ant Design + TailwindCSS
- **商家端**: React 19 + TypeScript + Vite + Ant Design (待开发)
- **管理端**: React 19 + TypeScript + Vite + Ant Design (待开发)
- **状态管理**: Zustand
- **数据请求**: React Query + Axios
- **路由**: React Router 6

### 后端 (待开发)
- **语言**: Python 3.x
- **框架**: FastAPI / Django (待定)
- **数据库**: PostgreSQL / MySQL (待定)
- **认证**: JWT

### Mock服务器
- **框架**: json-server + Express中间件
- **支持**: 三端接口模拟

## 📦 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd mall
```

### 2. 启动Mock服务器
```bash
cd mock-server
npm install
npm start        # 或 npm run dev (热重载)
```
访问: http://localhost:3000

### 3. 启动用户端前端
```bash
cd frontend/user-app
npm install
npm run dev
```
访问: http://localhost:5173

### 4. 启动后端 (待开发)
```bash
cd backend
# 待补充
```

## 📝 开发进度

### ✅ 已完成
- [x] 项目规划和文档
- [x] 用户端前端框架搭建
- [x] Mock服务器三端接口
- [x] 用户端登录/注册页面
- [x] 集成Ant Design组件库

### 🚧 进行中
- [ ] 用户端商品浏览模块
- [ ] 用户端购物车功能
- [ ] 用户端订单管理

### 📅 待开发
- [ ] 商家端前端
- [ ] 管理端前端
- [ ] Python后端服务
- [ ] 数据库设计与实现
- [ ] 部署配置

## 🔧 开发规范

### 分支管理
- `main` - 主分支，稳定版本
- `develop` - 开发分支
- `feature/*` - 功能分支
- `fix/*` - 修复分支

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具链
```

### 目录说明
- `docs/` - 所有设计文档和接口文档
- `frontend/` - 所有前端项目
- `backend/` - 后端项目
- `mock-server/` - Mock API服务器

## 📖 文档链接

- [项目总览](./docs/00-项目总览与任务计划表.md)
- [需求分析](./docs/01-需求分析文档.md)
- [技术架构](./docs/02-技术架构设计文档.md)
- [用户端设计](./docs/03-前端设计文档/03-1-用户端设计.md)
- [用户端接口文档](./docs/09-接口文档/用户端接口文档.md)
- [Mock服务器说明](./mock-server/README.md)

## 👥 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 License

MIT License

## 📮 联系方式

- 项目地址: [GitHub仓库地址]
- 问题反馈: [Issues]

---

**开发中... 敬请期待！** 🎉
