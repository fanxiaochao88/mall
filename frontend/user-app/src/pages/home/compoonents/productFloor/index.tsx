import React, { useEffect } from 'react'

import { LoadingComponent } from '@/components/loading'
import { useHome } from '@/hooks/serverData/useHome'

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
  const { setProductParams, products, isProductsLoading } = useHome()

  useEffect(() => {
    setProductParams({
      type: 'all',
      category_id,
      page: 1,
      page_size: 7,
    })
  }, [category_id, setProductParams])

  const mainProduct = products[0] // 左侧大卡片
  const subProducts = products.slice(1) // 右侧6个小卡片

  return (
    <section className={`p-6 rounded-lg shadow-sm mb-6 ${bgColor}`}>
      {/* 楼层顶部 */}
      <div className="flex items-center justify-between mb-4 bober-b pb-2">
        <Title level={5}>{title}</Title>
        <Button icon={<RightOutlined />} iconPlacement='end'>更多</Button>
      </div>
      {/* 楼层内容 */}
      {
        isProductsLoading ? <LoadingComponent /> : (
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

