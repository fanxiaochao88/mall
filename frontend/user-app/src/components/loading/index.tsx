import React from 'react'
import { Spin } from 'antd'

interface Props {
  size?: 'small' | 'default' | 'large'
  description?: string
}

export const LoadingComponent: React.FC<Props> = ({ size = 'default', description = '加载中...' }) => {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spin size={size} description={description} />
      </div>
    )
}
