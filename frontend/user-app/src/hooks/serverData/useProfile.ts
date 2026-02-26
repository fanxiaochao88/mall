import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/api/user'

import type { UpdateUserRequest, User } from '@/types'

import { App } from 'antd'

const userKeys = {
  all: ['users'] as const,
}

export function useProfile() {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  // 获取当前用户信息
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: userKeys.all,
    queryFn: () => userApi.getMe(),
  })

  // 更新用户信息
  const updateMutation = useMutation({
    mutationFn: (data: UpdateUserRequest) => userApi.updateMe(data),
    onSuccess: () => {
      message.success('更新用户信息成功')
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  return {
    user,
    isLoading,
    error,
    updateUser: updateMutation.mutate,
    isUpdateLoading: updateMutation.isPending,
  }
}
