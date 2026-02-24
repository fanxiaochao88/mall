/**
 * 订单相关类型定义
 */

export type OrderStatus =
  | 'pending_payment'
  | 'pending_shipment'
  | 'shipped'
  | 'completed'
  | 'cancelled'
  | 'refunding'
  | 'refunded'

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  sku_id: number
  product_name: string
  sku_name?: string
  image: string
  price: number
  quantity: number
  subtotal: number
}

export interface Order {
  id: number
  order_no: string
  user_id: number
  merchant_id: number
  merchant_name?: string
  receiver_name: string
  receiver_phone: string
  receiver_address: string
  total_amount: number
  freight: number
  discount_amount: number
  actual_amount: number
  status: OrderStatus
  logistics_company?: string
  logistics_no?: string
  remark?: string
  merchant_remark?: string
  paid_at?: string
  shipped_at?: string
  completed_at?: string
  created_at: string
  items: OrderItem[]
}

export interface OrderListItem {
  id: number
  order_no: string
  merchant_id: number
  merchant_name: string
  total_amount: number
  actual_amount: number
  status: OrderStatus
  created_at: string
  items: OrderItem[]
}

export interface OrderListResponse {
  total: number
  page: number
  page_size: number
  items: OrderListItem[]
}

export interface CreateOrderRequest {
  items: OrderItemInput[]
  address_id: number
  remark?: string
}

export interface OrderItemInput {
  sku_id: number
  quantity: number
}

export interface PayOrderRequest {
  payment_method: 'alipay' | 'wechat'
}

export interface OrderListQuery {
  status?: OrderStatus
  page?: number
  page_size?: number
}
