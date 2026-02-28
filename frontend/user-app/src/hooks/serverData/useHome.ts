import { useQuery, useQueryClient } from '@tanstack/react-query'
import { productApi } from '@/api/product'
import type { ProductListQuery, Banner } from '@/types'
import { useState } from 'react'

export const homeKeys = {
  banners: ['home', 'banners'] as const,
  products: (params: ProductListQuery) => ['home', 'products', params] as const,
}

/**
 * @description 首页数据
 */

export function useHome() {
  const queryClient = useQueryClient()

  // 轮播图 - 无参数，和 useAddress 一样
  const { data: banners, isLoading: isBannersLoading } = useQuery<Banner[]>({
    queryKey: homeKeys.banners,
    queryFn: () => productApi.getBanners(),
  })

  // 商品列表参数 - 用 state 管理
  const [productParams, setProductParams] = useState<ProductListQuery>({
    type: 'recommend',
    page: 1,
    page_size: 10,
  })

  // 商品列表 - 带参数，key 里包含参数
  const { data: productData, isLoading: isProductsLoading } = useQuery({
    queryKey: homeKeys.products(productParams),
    queryFn: () => productApi.getProducts(productParams),
  })

  // 切换商品类型（首页按钮点击时调用）
  const changeProductType = (type: ProductListQuery['type']) => {
    setProductParams(prev => ({ ...prev, type, page: 1 }))
  }

  // 分页切换
  const changePage = (page: number) => {
    setProductParams(prev => ({ ...prev, page }))
  }

  // 手动刷新
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: homeKeys.banners })
    queryClient.invalidateQueries({ queryKey: ['home', 'products'] })
  }

  return {
    // 轮播图
    banners,
    isBannersLoading,
    
    // 商品列表
    products: productData?.items ?? [],
    total: productData?.total ?? 0,
    isProductsLoading,
    productParams,
    
    // 操作方法
    changeProductType,
    changePage,
    setProductParams,
    handleRefresh,
  }
}
