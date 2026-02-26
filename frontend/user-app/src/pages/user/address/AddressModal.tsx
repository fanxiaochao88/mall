import React, { useEffect } from 'react'
import { Modal, Form, Input, Switch, Row, Col } from 'antd'
import type { Address } from '@/types'

interface Props {
  isAdd: boolean
  open: boolean
  initialData?: Address | null // 如果有数据则是编辑模式
  onClose: () => void
  onSubmit: (data: Address) => void // 提交
  loading: boolean // 加载中
}

export const AddressModal: React.FC<Props> = ({ open, isAdd, initialData, onClose, onSubmit, loading }) => {

  const [form] = Form.useForm();

  const handleOk = async () => {
    const data = await form.validateFields();
    onSubmit({ ...initialData, ...data } as Address)
  }

  useEffect(() => {
    if (open && !isAdd) {
      form.setFieldsValue(initialData)
    } else {
      form.resetFields()
    }
  }, [open, initialData, form, isAdd])

  return (
    <Modal
      open={open}
      title={isAdd ? '新增地址' : '编辑地址'}
      onCancel={onClose}
      onOk={() => handleOk()}
      confirmLoading={loading}
      forceRender
    >
      <Form form={form} layout="vertical" name="addressForm">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="receiver_name"
              label="收货人"
              rules={[{ required: true, message: '请输入收货人姓名' }]}
            >
              <Input placeholder="姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="receiver_phone"
              label="手机号"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input placeholder="手机号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
            <Col span={8}>
                <Form.Item name="province" label="省份" rules={[{ required: true }]}>
                    <Input placeholder="省" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="city" label="城市" rules={[{ required: true }]}>
                    <Input placeholder="市" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="district" label="区县" rules={[{ required: true }]}>
                    <Input placeholder="区" />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item
          name="detail"
          label="详细地址"
          rules={[{ required: true, message: '请输入详细地址' }]}
        >
          <Input.TextArea rows={2} placeholder="街道、楼牌号等" />
        </Form.Item>
        <Form.Item name="is_default" label="设为默认" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
