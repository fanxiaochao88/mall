import { useQuery, useQueryClient } from '@tanstack/react-query'
import { productApi } from '@/api/product'
import type { Banner } from '@/types'

/**
 * @description 首页轮播图数据
 */
export function useHome() {
  const queryClient = useQueryClient()

  // 轮播图
  const { data: banners, isLoading: isBannersLoading } = useQuery<Banner[]>({
    queryKey: ['home', 'banners'],
    queryFn: () => productApi.getBanners(),
  })

  // 手动刷新轮播图
  const refreshBanners = () => {
    queryClient.invalidateQueries({ queryKey: ['home', 'banners'] })
  }

  return {
    banners,
    isBannersLoading,
    refreshBanners,
  }
}
