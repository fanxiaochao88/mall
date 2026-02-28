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
   * @description 获取商品列表
   * 
   * 可以通过type参数指定商品类型，
   * 可以根据过滤参数指定商品分类、价格范围、排序方式等
   * 搜索框搜索, 分类点击, 选项卡切换
   * 
   * @param params - 商品列表查询参数
   * @returns 商品列表
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
