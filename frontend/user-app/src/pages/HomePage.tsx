/**
 * 首页
 */
import { Card, Row, Col, Typography, Tag } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function HomePage() {
  const features = [
    {
      icon: '🚀',
      title: '项目初始化',
      desc: 'Vite + React + TypeScript',
      tags: ['Vite', 'React 19', 'TypeScript']
    },
    {
      icon: '🎨',
      title: 'UI框架集成',
      desc: 'Ant Design + TailwindCSS',
      tags: ['Antd', 'TailwindCSS', '响应式']
    },
    {
      icon: '⚙️',
      title: '配置完成',
      desc: 'Router, Zustand, React Query',
      tags: ['React Router', 'Zustand', 'React Query']
    },
    {
      icon: '🔧',
      title: '基础架构',
      desc: 'API, Types, Stores, Layouts',
      tags: ['API封装', '类型定义', '状态管理']
    },
    {
      icon: '🌐',
      title: 'Mock服务',
      desc: '完整的接口模拟服务',
      tags: ['JSON Server', '三端支持', '热重载']
    },
    {
      icon: '📱',
      title: '组件库',
      desc: 'Antd企业级组件',
      tags: ['Form', 'Table', 'Modal']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Title level={1}>
          <span className="text-primary-600">🛒 Mall商城</span>
        </Title>
        <Paragraph className="text-lg text-gray-600">
          用户端框架已搭建完成，集成Ant Design组件库
        </Paragraph>
        <Tag icon={<CheckCircleOutlined />} color="success" className="mt-2">
          框架搭建完成
        </Tag>
      </div>

      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className="h-full"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph className="text-gray-600 mb-4">
                  {feature.desc}
                </Paragraph>
                <div className="flex flex-wrap gap-2 justify-center">
                  {feature.tags.map((tag, i) => (
                    <Tag key={i} color="blue">{tag}</Tag>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <Title level={3}>🎯 下一步开发</Title>
          <Paragraph className="text-gray-600">
            按照设计文档，依次完成商品浏览、购物车、订单管理等核心功能
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}
