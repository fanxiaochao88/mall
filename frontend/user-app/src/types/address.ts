/**
 * 收货地址相关类型定义
 */

export interface Address {
  // 地址ID
  id: number
  // 用户ID
  user_id: number
  // 收货人姓名
  receiver_name: string
  // 收货人电话
  receiver_phone: string
  // 省份
  province: string
  city: string // 城市
  district: string // 区县
  detail: string // 详细地址
  is_default: boolean // 是否默认地址
  created_at: string // 创建时间
}

export interface CreateAddressRequest {
  receiver_name: string // 收货人姓名
  receiver_phone: string // 收货人电话
  province: string // 省份
  city: string // 城市
  district: string // 区县
  detail: string // 详细地址
  is_default?: boolean // 是否默认地址
}

export type UpdateAddressRequest = CreateAddressRequest
