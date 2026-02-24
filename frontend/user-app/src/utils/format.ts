/**
 * 格式化价格
 * @param price 价格(分)
 * @returns 格式化后的价格字符串
 */
export function formatPrice(price: number): string {
  return `¥${(price / 100).toFixed(2)}`
}

/**
 * 格式化日期
 * @param date 日期字符串或Date对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * 格式化日期时间
 * @param date 日期字符串或Date对象
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * 隐藏手机号中间4位
 * @param phone 手机号
 * @returns 隐藏后的手机号
 */
export function hidePhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
