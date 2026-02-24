/**
 * 路由配置
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import UserLayout from '@/layouts/UserLayout'

// 页面组件 - 稍后创建
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // TODO: 其他公开页面路由
      // {
      //   path: 'products',
      //   element: <ProductListPage />,
      // },
      // {
      //   path: 'products/:id',
      //   element: <ProductDetailPage />,
      // },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user/orders" replace />,
      },
      // TODO: 用户中心路由
      // {
      //   path: 'orders',
      //   element: <OrderListPage />,
      // },
      // {
      //   path: 'orders/:id',
      //   element: <OrderDetailPage />,
      // },
    ],
  },
])

export default router
