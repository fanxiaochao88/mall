import React from 'react'

import { Button, Segmented } from 'antd'

interface Props {
  sortBy: string,
  onSortChange: (sortBy: string) => void,
  onReset: () => void
}

const FilterBay: React.FC<Props> = ({ sortBy = 'default', onSortChange, onReset }) => {
  const sortOptions = [
    { label: '综合', value: 'default' },
    { label: '价格升序', value: 'price_asc' },
    { label: '价格降序', value: 'price_desc' },
    { label: '销量', value: 'sales' },
    { label: '最新', value: 'new' },
  ]

  return (
    <div className='flex items-center justify-between mb-6 p-4 bg-gray-50 rounded'>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600'>排序:</span>
        <Segmented 
          options={sortOptions}
          value={sortBy}
          onChange={value => onSortChange(value as string)}
        />
      </div>
      <Button onClick={onReset}>重置筛选</Button>
    </div>
  )
}

export default FilterBay
