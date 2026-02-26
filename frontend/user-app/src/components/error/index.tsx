import React from 'react'
import { Result } from 'antd'

interface Props {
    title?: string
    subTitle?: string
    extra?: React.ReactNode | React.ReactNode[]
}

export const ErrorComponent: React.FC<Props> = ({ title = '加载失败', subTitle = '请稍后重试', extra }) => {
    return (
        <div>
            <Result
                status="error"
                title={title}
                subTitle={subTitle}
                extra={extra}
            />
        </div>
    )
}