/**
 * 商品相关类型定义
 */

export interface ProductItem {
  id: number
  name: string
  image: string
  min_price: number
  max_price: number
  sales: number
  merchant_id: number
  merchant_name: string
}

export interface ProductDetail {
  id: number
  merchant_id: number
  merchant_name: string
  category_id: number
  category_name: string
  name: string
  description: string
  images: string[]
  video?: string
  status: string
  sales: number
  created_at: string
  skus: ProductSKU[]
}

export interface ProductSKU {
  id: number
  sku_name?: string
  price: number
  stock: number
  image?: string
  attributes?: Record<string, string>
}

export interface ProductListQuery {
  category_id?: number
  keyword?: string
  min_price?: number
  max_price?: number
  sort_by?: 'default' | 'price_asc' | 'price_desc' | 'sales' | 'new'
  page?: number
  page_size?: number
}

export interface ProductListResponse {
  total: number
  page: number
  page_size: number
  items: ProductItem[]
}

export interface Category {
  id: number
  parent_id?: number
  name: string
  icon?: string
  sort_order: number
  children?: Category[]
}

export interface Banner {
  id: number
  title: string
  image: string
  link?: string
  sort_order: number
  status: string
}
