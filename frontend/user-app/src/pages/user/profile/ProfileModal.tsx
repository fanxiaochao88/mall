import React, { useEffect } from 'react'
import { Form, Modal, Input } from 'antd'
import type { User } from '@/types'

interface Props {
  open: boolean
  initialData?: User
  onClose: () => void
  onSubmit: (data: User) => void
  isPending: boolean
}

const ProfileModal: React.FC<Props> = ({ open, onClose, initialData, onSubmit, isPending }) => {

  const [form] = Form.useForm()

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue(initialData)
    }
  }, [open, initialData, form])

    return (
        <Modal
            open={open}
            title="编辑资料"
            onCancel={onClose}
            onOk={() => {
                form.validateFields().then((values) => {
                    onSubmit(values)
                })
            }}
            confirmLoading={isPending}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="nickname"
                    label="昵称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="头像"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ProfileModal

