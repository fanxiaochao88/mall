/**
 * 用户相关类型定义
 */

export interface User {
  id: number
  username: string
  phone: string
  email?: string
  avatar?: string
  nickname?: string
  status: 'normal' | 'disabled'
  created_at: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: User
}

export interface RegisterRequest {
  username: string
  phone: string
  email?: string
  password: string
  code: string
}

export interface UpdateUserRequest {
  nickname?: string
  avatar?: string
  email?: string
}

export interface SendCodeRequest {
  phone: string
  type: 'register' | 'login' | 'reset_password'
}
