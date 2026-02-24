/**
 * 注册页面
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, PhoneOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'
import { userApi } from '@/api'
import type { RegisterRequest } from '@/types'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [sendingCode, setSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = async () => {
    try {
      const phone = form.getFieldValue('phone')
      if (!phone) {
        message.warning('请先输入手机号')
        return
      }

      setSendingCode(true)
      await userApi.sendCode({ phone, type: 'register' })
      message.success('验证码已发送，测试码: 1234')
      
      // 倒计时
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      message.error(err instanceof Error ? err.message : '发送失败')
    } finally {
      setSendingCode(false)
    }
  }

  const onFinish = async (values: RegisterRequest) => {
    try {
      await userApi.register(values)
      message.success('注册成功，请登录')
      navigate('/login')
    } catch (err) {
      message.error(err instanceof Error ? err.message : '注册失败')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">用户注册</h2>
          <p className="text-gray-500 mt-2">创建新账号</p>
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
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 50, message: '用户名长度3-50字符' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名 (3-50字符)"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="手机号"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              prefix={<SafetyOutlined />}
              placeholder="验证码"
              maxLength={6}
              suffix={
                <Button
                  type="link"
                  size="small"
                  onClick={handleSendCode}
                  loading={sendingCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, max: 20, message: '密码长度6-20字符' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码 (6-20字符)"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              注册
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="text-gray-600">已有账号? </span>
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            立即登录
          </Link>
        </div>
      </Card>
    </div>
  )
}
