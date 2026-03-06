/**
 * 商品相关类型定义
 */

/**
 * 列表项
 */
export interface ProductItem {
  id: number
  name: string
  image: string
  min_price: number
  max_price: number
  sales: number
  merchant_id: number
  merchant_name: string // 商户名称
}

/**
 * 详情
 */
export interface ProductDetail {
  id: number // 商品ID
  merchant_id: number // 商户ID
  merchant_name: string // 商户名称
  category_id: number // 分类ID
  category_name: string // 分类名称
  name: string // 商品名称
  description: string // 商品描述
  images: string[] // 商品图片列表
  video?: string // 商品视频URL（可选）
  status: string // 商品状态（on_sale: 在售, off_sale: 下架）
  sales: number // 销量
  created_at: string // 创建时间
  skus: ProductSKU[] // SKU列表
}

/**
 * SKU（库存量单位）
 */
export interface ProductSKU {
  id: number // SKU ID
  sku_name?: string // SKU名称（可选，如"红色-L码"）
  price: number // SKU价格
  stock: number // 库存数量
  image?: string // SKU图片（可选，如不同颜色的商品图）
  attributes?: Record<string, string> // SKU属性（如 {color: "红色", size: "L"}）
}
/**
 * 列表请求参数
 */
export interface ProductListQuery {
  type?: 'all' | 'new' | 'hot' | 'recommend'
  category_id?: number
  keyword?: string
  min_price?: number
  max_price?: number
  sort_by?: 'default' | 'price_asc' | 'price_desc' | 'sales' | 'new'
  page?: number
  page_size?: number
}
/**
 * 列表返回结构
 */
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
/**
 * 轮播图返回结构
 */
export interface Banner {
  id: number
  title: string
  image: string
  link?: string
  sort_order: number
  status: string
}
