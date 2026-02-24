/**
 * 订单相关API
 */
import request from './request'
import type {
  Order,
  OrderListQuery,
  OrderListResponse,
  CreateOrderRequest,
  PayOrderRequest,
} from '@/types'

export const orderApi = {
  /**
   * 创建订单
   */
  createOrder: (data: CreateOrderRequest) => {
    return request.post<any, Order>('/orders', data)
  },

  /**
   * 获取订单列表
   */
  getOrders: (params: OrderListQuery) => {
    return request.get<any, OrderListResponse>('/orders', { params })
  },

  /**
   * 获取订单详情
   */
  getOrderDetail: (id: number) => {
    return request.get<any, Order>(`/orders/${id}`)
  },

  /**
   * 支付订单
   */
  payOrder: (id: number, data: PayOrderRequest) => {
    return request.post<any, Order>(`/orders/${id}/pay`, data)
  },

  /**
   * 取消订单
   */
  cancelOrder: (id: number) => {
    return request.post<any, Order>(`/orders/${id}/cancel`)
  },

  /**
   * 确认收货
   */
  confirmOrder: (id: number) => {
    return request.post<any, Order>(`/orders/${id}/confirm`)
  },
}
