import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/api/product'
import type { ProductListQuery } from '@/types'
import { useState } from 'react'

/**
 * @description 商品列表数据获取 hook
 * 适用于：推荐模块、楼层模块、商品列表页
 */
export function useProducts(initialParams: ProductListQuery) {
  const [params, setParams] = useState<ProductListQuery>(initialParams)

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getProducts(params),
  })

  // 切换商品类型
  const changeType = (type: ProductListQuery['type']) => {
    setParams(prev => ({ ...prev, type, page: 1 }))
  }

  // 切换分类
  const changeCategory = (category_id: number) => {
    setParams(prev => ({ ...prev, category_id, page: 1 }))
  }

  // 切换页码
  const changePage = (page: number) => {
    setParams(prev => ({ ...prev, page }))
  }

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    params,
    setParams,
    changeType,
    changeCategory,
    changePage,
  }
}
