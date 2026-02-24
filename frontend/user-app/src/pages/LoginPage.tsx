/**
 * 登录页面
 */
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/stores'
import { userApi } from '@/api'
import type { LoginRequest } from '@/types'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form] = Form.useForm()

  const onFinish = async (values: LoginRequest) => {
    try {
      const response = await userApi.login(values)
      setAuth(response.user, response.access_token)
      message.success('登录成功')
      navigate('/')
    } catch (err) {
      message.error(err instanceof Error ? err.message : '登录失败')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">用户登录</h2>
          <p className="text-gray-500 mt-2">欢迎回来</p>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名或手机号' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名/手机号"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="text-gray-600">还没有账号? </span>
          <Link to="/register" className="text-primary-600 hover:text-primary-700">
            立即注册
          </Link>
        </div>
      </Card>
    </div>
  )
}
