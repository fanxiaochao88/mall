import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductDetail } from '@/hooks/serverData/useProductDetail'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>() 
  const { product, isLoading, error } = useProductDetail(Number(id))

  if (isLoading) return <div>loading</div>
  if (error) return <div>error</div>

  return (
    <div>
      {
        product?.skus.map(one => (
          <div>
            { one.sku_name }
          </div>
        ))
      }
    </div>
  )

}

export default ProductDetailPage
