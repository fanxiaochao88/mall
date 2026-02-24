/**
 * 收货地址相关API
 */
import request from './request'
import type { Address, CreateAddressRequest, UpdateAddressRequest } from '@/types'

export const addressApi = {
  /**
   * 获取地址列表
   */
  getAddresses: () => {
    return request.get<any, Address[]>('/addresses')
  },

  /**
   * 创建地址
   */
  createAddress: (data: CreateAddressRequest) => {
    return request.post<any, Address>('/addresses', data)
  },

  /**
   * 更新地址
   */
  updateAddress: (id: number, data: UpdateAddressRequest) => {
    return request.put<any, Address>(`/addresses/${id}`, data)
  },

  /**
   * 删除地址
   */
  deleteAddress: (id: number) => {
    return request.delete<any, null>(`/addresses/${id}`)
  },

  /**
   * 设置默认地址
   */
  setDefaultAddress: (id: number) => {
    return request.post<any, Address>(`/addresses/${id}/set-default`)
  },
}
