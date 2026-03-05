import React from 'react'
import ProductCard from '@/components/productCard'
import ProductCardSkeleton from '@/components/productCard/Skeletion'

import { ErrorComponent } from '@/components/error'

import type { ProductItem } from '@/types'

interface Props {
  products: ProductItem[],
  isLoading: boolean,
  error: Error | null
}

const ProductsList: React.FC<Props> = ({ products, isLoading, error }) => {
  // 加载中显示骨架屏
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        <ProductCardSkeleton count={20} />
      </div>
    )
  }
  // 报错或者数据为空显示错误状态
  if (error || products.length === 0) {
    return <ErrorComponent />
  }
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  )
}

export default ProductsList
