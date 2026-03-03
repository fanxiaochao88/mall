import React from 'react'
import { Button, Tabs } from 'antd'
import { useHome } from '@/hooks/serverData/useHome'
import type { ProductListQuery } from '@/types'
import ProductCard from '@/components/productCard'
import { ErrorComponent } from '@/components/error'
import { RightOutlined } from '@ant-design/icons'
import ProductCardSkeleton from '@/components/productCard/Skeletion'

const RecommendedTabs: React.FC = () => {

  const { changeProductType, products, isProductsLoading, productsError, setProductParams } = useHome()

  const tabItems = [
    { key: 'recommend', label: '热门推荐' },
    { key: 'new', label: '最新上市' },
    { key: 'hot', label: '热门单品' },
  ];

  // 切换tab, 触发组件重新渲染, 触发useQuery, 发现是一个新的key, 触发queryFn
  const handleChange = (key: string) => {
    changeProductType(key as ProductListQuery['type'])
    setProductParams({
      type: key as ProductListQuery['type'],
      page: 1,
      page_size: 30,
    })
  };

  const handleMore = () => {
    console.log('跳转商品列表页面')
  }

  return (
    <div>
      {/* tab切换 */}
      <div className='flex justify-between'>
        <Tabs items={tabItems} onChange={handleChange} />
        <Button icon={<RightOutlined />} onClick={handleMore}>更多</Button>
      </div>
      {/* 加载中 */}
      {
        isProductsLoading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            <ProductCardSkeleton count={10} />
          </div>
        ) : null
      }
      {/* 错误 */}
      {
        productsError ? <ErrorComponent /> : null
      }
      {/* 商品列表 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedTabs
