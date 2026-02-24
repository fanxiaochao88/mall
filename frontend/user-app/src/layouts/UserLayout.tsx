/**
 * 用户中心布局组件
 */
import { Outlet, Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function UserLayout() {
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
                  className="block px-4 py-2 rounded hover:bg-gray-100"
                >
                  我的订单
                </Link>
                <Link
                  to="/user/address"
                  className="block px-4 py-2 rounded hover:bg-gray-100"
                >
                  收货地址
                </Link>
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 rounded hover:bg-gray-100"
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
