import type { Banner } from '@/types'
import { Carousel } from 'antd'
import BannersSkeleton from './Skeleton'

interface BannersProps {
  banners: Banner[],
  isLoading: boolean,
}

export default function Banners({ banners, isLoading }: BannersProps) {

  if (!banners?.length) return null


  const handleBannerClick = (banner: Banner) => () => {
    if (banner.link) {
      window.open(banner.link, '_blank')
    }
  }

  return (
    <div className='relative mx-auto w-[77%] h-[400px]'>
      <Carousel
        autoplay
        dots
        effect='fade'
        speed={500}
        autoplaySpeed={5000}
        pauseOnHover
        dotPlacement='bottom'
        draggable
        arrows
      >
        {
          isLoading ? <BannersSkeleton /> : banners.map((banner) => (
            <div key={banner.id}>
              <img
                onClick={handleBannerClick(banner)}
                src={banner.image}
                alt={banner.title}
                className='w-full object-cover'
              />
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}