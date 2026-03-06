import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/api/product'

/**
 * 商品详情数据
 */
export function useProductDetail(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id),
    enabled: !!id && id > 0 // 检测id的合法性
  })

  return {
    product: data,
    isLoading,
    error
  }
}

