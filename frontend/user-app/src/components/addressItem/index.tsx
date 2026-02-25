/**
 * 地址项组件
 */
import React from 'react'
import { Card, Button, Tag } from 'antd'
import { FormOutlined, DeleteOutlined, StarOutlined, UserOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons'
import type { Address } from '@/types'

interface Props {
  data: Address
  onEdit: (record: Address) => void // 编辑
  onDelete: (id: number) => void // 删除
  onSetDefault: (id: number) => void // 设置默认
  // onSelect: (record: Address) => void // 选择

  isSelectd?: boolean // 是否选中
  showActions?: boolean // 是否显示操作按钮
  isOrder?: boolean // 是否是订单模块使用
}

const AddressItem: React.FC<Props> = ({ 
  data, 
  onEdit, 
  onDelete, 
  onSetDefault, 
  // onSelect, 
  showActions = true,
  isOrder = false
}) => {

  // 拼接完整地址
  const fullAddress = `${data.province} ${data.city} ${data.district} ${data.detail}`

  // 渲染操作按钮
  const renderActions = () => {
    if (!showActions) {
      return []
    }

    // 订单模块
    if (isOrder) {
      return [<Button key="select" type="link">选择</Button>]
    }
    // 默认值选择的
    if (data.is_default) {
      return [
        <Button key="edit" type="default" onClick={() => onEdit(data)}><FormOutlined />编辑</Button>,
        <Button key="delete" type="default" danger onClick={() => onDelete(data.id)}><DeleteOutlined />删除</Button>
      ]
    }
    return [
      <Button key="set-default" type="link" onClick={() => onSetDefault(data.id)}><StarOutlined />设置默认</Button>,
      <Button key="edit" type="default" onClick={() => onEdit(data)}><FormOutlined />编辑</Button>,
      <Button key="delete" type="default" danger onClick={() => onDelete(data.id)}><DeleteOutlined />删除</Button>
    ]
  }

  return (
      <Card
        hoverable
        actions={renderActions()}
        className='relative'
      >
        {
          data.is_default && <Tag icon={<StarOutlined />} color="warning" variant='solid' className='absolute top-2 right-2'>默认地址</Tag>
        }
        <div className='flex items-center mb-2'>
          <UserOutlined className='text-gray-500' />
          <div className='ml-2'>{data.receiver_name}</div>
        </div>
        <div className='flex items-center mb-2'>
          <PhoneOutlined className='text-gray-500' />
          <div className='ml-2'>{data.receiver_phone}</div>
        </div>
        <div className='flex items-center mb-2'>
          <EnvironmentOutlined className='text-gray-500' />
          <div className='ml-2'>{fullAddress}</div>
        </div>
      </Card>
  )
}

export default AddressItem

