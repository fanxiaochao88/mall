/**
 * 首页
 */
import { useHome } from '@/hooks/serverData/useHome'
import Banners from './compoonents/banners'
import RecommendedTabs from './compoonents/productsModal'
import ProductFloor from './compoonents/productFloor'

export default function HomePage() {

  const { banners = [], isBannersLoading } = useHome()

   const floors = [
    { title: '📱 手机数码', categoryId: 11, bgColor: 'bg-blue-50' },
    { title: '💻 电脑办公', categoryId: 12, bgColor: 'bg-green-50' },
    { title: '🧥 羽绒服饰', categoryId: 2, bgColor: 'bg-orange-50' },
  ];

  return (
    <div className='container mx-auto px-4 py-12'>
      <Banners banners={banners} isLoading={isBannersLoading}/>
      <RecommendedTabs />
      {
        floors.map((floor) => (
          <ProductFloor key={floor.categoryId} title={floor.title} category_id={floor.categoryId} bgColor={floor.bgColor} />
        ))
      }
    </div>
  )
}
