import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/serverData/useProducts'

import type { ProductListQuery } from '@/types'

import { Pagination } from 'antd'

import FilterBay from './components/FilterBar'
import ProductsList from './components/ProductsList'

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 构建新的参数
  const initialParams: ProductListQuery = {
    type: searchParams.get('type') as ProductListQuery['type'] || 'all',
    category_id: searchParams.get('category_id') ? Number(searchParams.get('category_id')) : undefined,
    keyword: searchParams.get('keyword') || undefined,
    sort_by: searchParams.get('sort_by') as ProductListQuery['sort_by'] || 'default',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    page_size: 20
  }

  const { products, total, isLoading, error, params, setParams } = useProducts(initialParams)

  const { sort_by = 'default' } = params

  // 更新参数, 触发key刷新, 触发数据重新渲染
  const updateParams = (newParams: Partial<ProductListQuery>) => {
    // 创建URLSearchParams副本, 只操作副本
    const params = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })

    // 刷新地址栏
    setSearchParams(params)
    // 刷新key, 触发数据的请求
    setParams(prev => ({ ...prev, ...newParams }))
  }

  // 排序
  const handleSort = (value: string) => {
    updateParams({ sort_by: value as ProductListQuery['sort_by'], page: 1 })
  }

  // 重置排序
  const handleReset = () => {
    const type = searchParams.get('type')
    const category_id = searchParams.get('category_id')

    const restParams: ProductListQuery = {
      type: type ? type as ProductListQuery['type'] : 'all',
      category_id: category_id ? Number(category_id) : undefined,
      page: 1,
      page_size: 20,
      sort_by: 'default'
    }

    const params = new URLSearchParams()

    if (type) {
      params.set('type', type)
    }
    if (category_id) {
      params.set('category_id', category_id)
    }
    // 地址栏恢复最初
    setSearchParams(params)
    // 数据恢复最初, 因为不过从哪里进来, 最初这三个参数一定是1, 20, default为初始状态
    setParams(restParams)
  }

  // 分页切换
  const handlePageChange = (page: number, pageSize: number) => {
    updateParams({ page, page_size: pageSize })
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* 子组件在这里组装 */}
      <FilterBay sortBy={sort_by} onReset={handleReset} onSortChange={handleSort} />
      <ProductsList products={products} isLoading={isLoading} error={error} />
      {
        !isLoading && products.length > 0 && (
          <div className='flex justify-center mt-8'>
            <Pagination
              current={params.page}
              total={total}
              pageSize={params.page_size}
              onChange={handlePageChange}
              showSizeChanger={false}
              showTotal={total => `共 ${total} 件产品`}
            />
          </div>
        )
      }
    </div>
  )
}
