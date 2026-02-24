/**
 * 购物车相关类型定义
 */

export interface CartItem {
  id: number
  user_id: number
  sku_id: number
  quantity: number
  created_at: string
  // 关联数据
  product: {
    id: number
    name: string
    image: string
    status: string
  }
  sku: {
    id: number
    sku_name?: string
    price: number
    stock: number
    attributes?: Record<string, string>
  }
  merchant: {
    id: number
    shop_name: string
  }
  // 计算字段
  subtotal: number
  is_valid: boolean
}

export interface AddCartRequest {
  sku_id: number
  quantity: number
}

export interface UpdateCartRequest {
  quantity: number
}

export interface BatchDeleteRequest {
  ids: number[]
}
