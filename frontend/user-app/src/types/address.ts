/**
 * 收货地址相关类型定义
 */

export interface Address {
  id: number
  user_id: number
  receiver_name: string
  receiver_phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
  created_at: string
}

export interface CreateAddressRequest {
  receiver_name: string
  receiver_phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default?: boolean
}

export type UpdateAddressRequest = CreateAddressRequest
