# 用户端应用 (User App)

基于React + TypeScript + Vite的电商用户端前端应用。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7
- **UI**: TailwindCSS
- **路由**: React Router 6
- **状态管理**: Zustand
- **数据请求**: TanStack Query + Axios
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

## 项目结构

```
src/
├── api/              # API接口封装
├── components/       # 公共组件
├── pages/            # 页面组件
├── layouts/          # 布局组件
├── stores/           # Zustand状态管理
├── types/            # TypeScript类型定义
├── utils/            # 工具函数
├── router/           # 路由配置
└── main.tsx          # 入口文件
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 接口对接

项目配置了API代理,开发环境下`/api`请求会被代理到 `http://localhost:3000`。

请确保Mock服务器或后端API服务在3000端口运行。

## 功能模块

- ✅ 用户认证 (登录/注册)
- ✅ 基础布局 (Header/Footer)
- ✅ 路由系统
- ✅ 状态管理
- ✅ API封装
- 🚧 商品浏览 (开发中)
- 🚧 购物车 (开发中)
- 🚧 订单管理 (开发中)
- 🚧 用户中心 (开发中)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
