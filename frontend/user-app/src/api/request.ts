/**
 * Axios请求封装
 */
import axios, { AxiosError } from 'axios'
import type { ApiResponse } from '@/types'

// 创建axios实例
const request = axios.create({
  baseURL: '/api/v1/user',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data as ApiResponse
    if (code === 200 || code === 201) {
      return data as typeof response.data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError<ApiResponse>) => {
    // 处理HTTP错误
    if (error.response) {
      const { code, message } = error.response.data
      
      // 401未认证,跳转登录
      if (code === 401 || error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(new Error('请先登录'))
      }
      
      return Promise.reject(new Error(message || '请求失败'))
    }
    
    return Promise.reject(new Error('网络错误,请稍后重试'))
  }
)

export default request
