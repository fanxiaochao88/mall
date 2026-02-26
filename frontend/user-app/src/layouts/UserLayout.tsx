/**
 * 用户中心布局组件
 */
import { Outlet, Link, useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function UserLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const getKls = (path: string) => {
    const baseKls = 'block px-4 py-2 rounded'
    const activeKls = 'bg-blue-500 text-white font-bold'
    const hoverKls = 'hover:bg-gray-100'
    return `${baseKls} ${currentPath === path ? activeKls : hoverKls}`
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* 侧边栏 */}
            <aside className="w-48 bg-white rounded-lg shadow p-4">
              <nav className="space-y-2">
                <Link
                  to="/user/orders"
                  className={getKls('/user/orders')}
                >
                  我的订单
                </Link>
                <Link
                  to="/user/address"
                  className={getKls('/user/address')}
                >
                  收货地址
                </Link>
                <Link
                  to="/user/profile"
                  className={getKls('/user/profile')}
                >
                  个人信息
                </Link>
              </nav>
            </aside>
            
            {/* 内容区 */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
