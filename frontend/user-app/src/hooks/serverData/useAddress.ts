import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addressApi } from '@/api/address'
import type { Address, CreateAddressRequest } from '@/types'

import { App } from 'antd'

export const addressKeys = {
  all: ['addresses'] as const,
}

export function useAddress() {

  const { message } = App.useApp()
  const queryClient = useQueryClient()

  // 获取地址列表
  const { data: addresses, isLoading, error } = useQuery<Address[]>({
    queryKey: addressKeys.all,
    queryFn: () => addressApi.getAddresses(),
  })

  // 新增地址
  const createMutation = useMutation({
    mutationFn: (data: CreateAddressRequest) => addressApi.createAddress(data),
    onSuccess: () => {
      message.success('新增地址成功')
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  // 更新地址
  const updateMutation = useMutation({
    mutationFn: (data: Address) => addressApi.updateAddress(data.id, data),
    onSuccess: () => {
      message.success('更新地址成功')
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  // 删除地址
  const deleteMutation = useMutation({
    mutationFn: (id: number) => addressApi.deleteAddress(id),
    onSuccess: () => {
      message.success('删除地址成功')
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  // 设置默认值 (乐观设置)
  const setDefaultMutation = useMutation({
    mutationFn: (id: number) => addressApi.setDefaultAddress(id),
    onMutate: async (id) => {
      // 1. 取消所有查询
      await queryClient.cancelQueries({ queryKey: addressKeys.all })
      // 2. 获取当前数据
      const previousAddresses = queryClient.getQueryData<Address[]>(addressKeys.all)
      // 3. 乐观更新
      if (previousAddresses) {
        queryClient.setQueryData(addressKeys.all, previousAddresses.map((address) => {
          if (address.id === id) {
            return {
              ...address,
              is_default: true,
            }
          }
          return {
            ...address,
            is_default: false,
          }
        }))
      }
      // 4. 返回上一次的数据
      return { previousAddresses }
    },
    // 5. 设置失败
    onError: (__, _, context) => {
      message.error('设置默认地址失败')
      // 6. 恢复上一次的数据
      if (context?.previousAddresses) {
        queryClient.setQueryData(addressKeys.all, context.previousAddresses)
      }
    },
    // 6. 设置完成
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })

  // 手动刷新
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: addressKeys.all })
  }

  return {
    addresses,
    isLoading,
    error,
    createAddress: createMutation.mutate,
    updateAddress: updateMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    setDefaultAddress: setDefaultMutation.mutate,

    isCreateLoading: createMutation.isPending,
    isUpdateLoading: updateMutation.isPending,
    isDeleteLoading: deleteMutation.isPending,
    isSetDefaultLoading: setDefaultMutation.isPending,
    handleRefresh,
  }
}
