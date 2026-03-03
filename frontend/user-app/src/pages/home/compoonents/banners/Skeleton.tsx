import React from 'react'
import { Skeleton } from 'antd'

const BannersSkeleton: React.FC = () => {
  return (
    <div className='!w-full bg-gray-100 flex justify-center items-center' style={{ height: '400px' }}>
      <Skeleton.Image active style={{ width: '1200px', height: '400px'}} />
    </div>
  )
}

export default BannersSkeleton
