/**
 * 首页
 */
import { useHome } from '@/hooks/serverData/useHome'
import Banners from './compoonents/banners'

export default function HomePage() {

  const { banners = [] } = useHome()

  return (
    <div className='container mx-auto px-4 py-12'>
      <Banners banners={banners} />
    </div>
  )
}
