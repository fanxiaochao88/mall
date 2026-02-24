/**
 * 用户相关API
 */
import request from './request'
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateUserRequest,
  SendCodeRequest,
} from '@/types'

export const userApi = {
  /**
   * 用户注册
   */
  register: (data: RegisterRequest) => {
    return request.post<any, User>('/users/register', data)
  },

  /**
   * 发送验证码
   */
  sendCode: (data: SendCodeRequest) => {
    return request.post<any, null>('/users/send-code', data)
  },

  /**
   * 用户登录
   */
  login: (data: LoginRequest) => {
    return request.post<any, LoginResponse>('/users/login', data)
  },

  /**
   * 获取当前用户信息
   */
  getMe: () => {
    return request.get<any, User>('/users/me')
  },

  /**
   * 更新用户信息
   */
  updateMe: (data: UpdateUserRequest) => {
    return request.put<any, User>('/users/me', data)
  },
}
