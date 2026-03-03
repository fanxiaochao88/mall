/**
 * 首页
 */
import { useHome } from '@/hooks/serverData/useHome'
import Banners from './compoonents/banners'
import RecommendedTabs from './compoonents/productsModal'

export default function HomePage() {

  const { banners = [], isBannersLoading } = useHome()

  return (
    <div className='container mx-auto px-4 py-12'>
      <Banners banners={banners} isLoading={isBannersLoading}/>
      <RecommendedTabs />
    </div>
  )
}
