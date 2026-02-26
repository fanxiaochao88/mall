import React, { useState } from 'react'
import { useAddress } from '@/hooks/serverData/useAddress'
import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Spin, Result, message } from 'antd'
import AddressItem from '@/components/addressItem'
import type { Address } from '@/types'
import { AddressModal } from './AddressModal'

const AddressManagePage: React.FC = () => {
    const { addresses, isLoading, error, deleteAddress, createAddress, updateAddress, isCreateLoading, isUpdateLoading, setDefaultAddress, handleRefresh } = useAddress()
    const [modal, contextHolder] = Modal.useModal();
    const [messageApi, messageContextHolder] = message.useMessage()
    const [open, setOpen] = useState(false)
    const [isAdd, setIsAdd] = useState(true)
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

    // loading
    if (isLoading) {
        return (
          <div className='flex items-center justify-center w-full h-full'>
            <Spin size="large" />
          </div>
        )
    }

    // error
    if (error) {
        return (
          <div className='flex items-center justify-center w-full h-full'>
            <Result
              status="error"
              title="加载失败"
              subTitle="请稍后重试"
              extra={[
                <Button type="primary" key="console" onClick={handleRefresh}>
                  重试
                </Button>
              ]}
            />
          </div>
        )
    }

    const handleDelete = (id: number) => {
      modal.confirm({
        title: '删除地址',
        content: '确定要删除该收货地址吗？',
        onOk: () => {
          // 判断是否是默认地址
          if (addresses?.some((address) => address.id === id && address.is_default)) {
            messageApi.error('默认地址不能删除')
            return
          }
          deleteAddress(id)
        }
      })
    }

    const handleAdd = () => {
      setCurrentAddress(null)
      setOpen(true)
      setIsAdd(true)
    }

    const handleEdit = (address: Address) => {
      setCurrentAddress(address)
      setOpen(true)
      setIsAdd(false)
    }

    return (
        <div>
          <div className='flex justify-between items-center shadow-[0_3px_3px_-2px_rgba(0,0,0,0.3)] pb-3 mb-3'>
            <div className='flex items-center'>
              <EnvironmentOutlined className='text-sky-400' />
              <div className='ml-2 font-bold text-lg'>收货地址管理</div>
            </div>
            <Button icon={<PlusOutlined />} type="default" onClick={() => handleAdd()} >新增地址</Button>
          </div>
          <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'>
            {
              addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <AddressItem key={address.id} data={address} onDelete={handleDelete} onEdit={(address) => handleEdit(address)} onSetDefault={setDefaultAddress} />
                ))
              ) : (
                <div className='text-center'>暂无地址</div>
              )
            }
          </div>
          <AddressModal
            open={open}
            isAdd={isAdd}
            initialData={currentAddress}
            onClose={() => setOpen(false)}
            onSubmit={(data) => {
              if (isAdd) {
                createAddress(data, { onSuccess: () => setOpen(false) })
              } else {
                updateAddress(data, { onSuccess: () => setOpen(false) })
              }
            }}
            loading={isCreateLoading || isUpdateLoading}
          />
          {contextHolder}
          {messageContextHolder}
        </div>
    )
}

export default AddressManagePage
