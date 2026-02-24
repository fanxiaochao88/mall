/**
 * API响应类型定义
 */

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T | null
}
