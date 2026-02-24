/**
 * 购物车相关API
 */
import request from './request'
import type {
  CartItem,
  AddCartRequest,
  UpdateCartRequest,
  BatchDeleteRequest,
} from '@/types'

export const cartApi = {
  /**
   * 获取购物车列表
   */
  getCarts: () => {
    return request.get<any, CartItem[]>('/carts')
  },

  /**
   * 添加到购物车
   */
  addCart: (data: AddCartRequest) => {
    return request.post<any, CartItem>('/carts', data)
  },

  /**
   * 更新购物车商品数量
   */
  updateCart: (id: number, data: UpdateCartRequest) => {
    return request.put<any, CartItem>(`/carts/${id}`, data)
  },

  /**
   * 删除购物车商品
   */
  deleteCart: (id: number) => {
    return request.delete<any, null>(`/carts/${id}`)
  },

  /**
   * 批量删除购物车商品
   */
  batchDeleteCarts: (data: BatchDeleteRequest) => {
    return request.post<any, null>('/carts/batch-delete', data)
  },
}
