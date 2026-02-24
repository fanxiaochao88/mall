/**
 * 商品相关API
 */
import request from './request'
import type {
  ProductListQuery,
  ProductListResponse,
  ProductDetail,
  Category,
  Banner,
} from '@/types'

export const productApi = {
  /**
   * 获取商品列表
   */
  getProducts: (params: ProductListQuery) => {
    return request.get<any, ProductListResponse>('/products', { params })
  },

  /**
   * 获取商品详情
   */
  getProductDetail: (id: number) => {
    return request.get<any, ProductDetail>(`/products/${id}`)
  },

  /**
   * 获取商品分类
   */
  getCategories: (parentId?: number) => {
    return request.get<any, Category[]>('/categories', {
      params: parentId ? { parent_id: parentId } : undefined,
    })
  },

  /**
   * 获取首页轮播图
   */
  getBanners: () => {
    return request.get<any, Banner[]>('/banners')
  },
}
