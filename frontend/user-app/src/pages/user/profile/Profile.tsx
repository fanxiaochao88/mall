/**
 * 个人资料
 */
import { useState } from 'react'
import { useProfile } from '@/hooks/serverData/useProfile'
import { Button, Tag, Avatar, type DescriptionsProps, Descriptions } from 'antd'
import { EditOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { ErrorComponent } from '@/components/error'
import { LoadingComponent } from '@/components/loading'
import ProfileModal from './ProfileModal'
import type { User } from '@/types'

export default function ProfilePage() {
  const [open, setOpen] = useState(false)
  const { user, error, isLoading, isUpdateLoading, updateUser } = useProfile()

  const statusMap = {
    normal: '正常',
    disabled: '禁用',
  }

  // loading
  if (isLoading) {
    return <LoadingComponent />
  }

  // error
  if (error) {
    return <ErrorComponent
      title="加载失败"
      subTitle="请稍后重试"
    />
  }

  const handleEdit = () => {
    setOpen(true)
  }

  const handleUpdateProfile = (data: User) => {
    updateUser(data, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: user?.username,
    },
    {
      key: '2',
      label: '昵称',
      children: user?.nickname,
    },
    {
      key: '3',
      label: '手机号',
      children: user?.phone,
      icon: <PhoneOutlined className='mr-2 text-blue-500' />
    },
    {
      key: '4',
      label: '邮箱',
      children: user?.email,
      icon: <MailOutlined className='mr-2 text-blue-500' />
    },
    {
      key: '5',
      label: '注册时间',
      children: user?.created_at,
    },
  ].map(item => ({
    ...item,
    children: item.icon ? (<span>{item.icon}{item.children}</span>) : item.children,
    labelStyle: { width: 80 },              // 固定标题宽度
    contentStyle: { whiteSpace: 'pre-line' } // 内容多行时对齐
  }))

  return (
    <div className='flex items-stretch'>
      <div className='flex flex-col justify-center basis-1/3 items-center px-[5px]'>
        <Avatar size={100} src={<img draggable={false} src={user?.avatar} alt="avatar" />} />
        <div className='my-[10px] font-bold'>{user?.nickname}</div>
        <div className='mb-[10px] text-gray-500'>{`@${user?.username}`}</div>
        <Tag color={user?.status === 'normal' ? 'green' : 'red'}>{statusMap[user?.status || 'normal']}</Tag>
        <Button 
            color="primary"
            variant="outlined"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className='mt-[10px] block w-full'
        >
            编辑资料
        </Button>
      </div>
      <div className="mx-16" />
      <div className='flex flex-col justify-center items-center px-[5px]'>
        <Descriptions
          column={1}
          items={items}
        />
      </div>
      <ProfileModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={user}
        onSubmit={handleUpdateProfile}
        isPending={isUpdateLoading}
      />
    </div>
  )
}
