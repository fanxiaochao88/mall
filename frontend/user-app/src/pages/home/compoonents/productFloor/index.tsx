import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingComponent } from '@/components/loading'
import { useProducts } from '@/hooks/serverData/useProducts'

import { Button, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import ProductCard from '@/components/productCard'

const { Title } = Typography

interface Props {
  category_id: number,
  title: string,
  bgColor?: string
}

const ProductFloor: React.FC<Props> = ({ category_id, title, bgColor = 'bg-white' }) => {

  const navigate = useNavigate()

  const { products, isLoading, params } = useProducts({
    type: 'all',
    category_id,
    page: 1,
    page_size: 7,
  })

  const mainProduct = products[0] // 左侧大卡片
  const subProducts = products.slice(1) // 右侧6个小卡片

  const handleMore = () => {
    navigate({
      pathname: '/products',
      search: `?category_id=${params.category_id}`
    })
  }

  return (
    <section className={`p-6 rounded-lg shadow-sm mb-6 ${bgColor}`}>
      {/* 楼层顶部 */}
      <div className="flex items-center justify-between mb-4 bober-b pb-2">
        <Title level={5}>{title}</Title>
        <Button icon={<RightOutlined />} iconPlacement='end' onClick={handleMore}>更多</Button>
      </div>
      {/* 楼层内容 */}
      {
        isLoading ? <LoadingComponent /> : (
          <div className="flex gap-4" style={{minHeight: '340px'}}>
            {/* 左侧大图片 */}
            <div className='w-1/4'>
              <ProductCard product={mainProduct} mode='overlay' size='large'/>
            </div>
            {/* 右侧小卡片, 占3/4宽度, 2行3列 */}
            <div className='w-3/4 grid grid-cols-3 grid-rows-2 gap-4 '>
              {
                subProducts.map((product) => (
                  <ProductCard key={product.id} product={product} mode='overlay' size='normal'/>
                ))
              }
            </div>
          </div>
        )
      }
    </section>
  )
}

export default ProductFloor

