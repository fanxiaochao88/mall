/**
 * 顶部导航栏组件
 */
import { Link } from 'react-router-dom'
import { Input, Badge, Dropdown, Avatar, Button } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuthStore } from '@/stores'

const { Search } = Input

export default function Header() {
  const { user, logout } = useAuthStore()

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to="/user/profile">个人信息</Link>,
    },
    {
      key: 'orders',
      label: <Link to="/user/orders">我的订单</Link>,
    },
    {
      key: 'address',
      label: <Link to="/user/address">收货地址</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      danger: true,
      onClick: logout,
    },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            🛒 Mall
          </Link>

          {/* 搜索框 */}
          <div className="flex-1 max-w-xl mx-8">
            <Search
              placeholder="搜索商品"
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </div>

          {/* 右侧菜单 */}
          <nav className="flex items-center gap-6">
            <Link to="/cart">
              <Badge count={0} showZero>
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
                >
                  购物车
                </Button>
              </Badge>
            </Link>

            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary-600">
                  <Avatar
                    size="small"
                    src={user.avatar}
                    icon={<UserOutlined />}
                  />
                  <span>{user.nickname || user.username}</span>
                </div>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button type="text">登录</Button>
                </Link>
                <Link to="/register">
                  <Button type="primary">注册</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
