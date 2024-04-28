import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import EmblaCarousel from '../ui/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import '../../public/embla.css'
interface ProductProps {

}
const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Product: FC<ProductProps> = ({ }) => {
  return <div>
    <h2>breadcrumb section</h2>
    <br />
    <Link href={`/`} className='flex'>
      <ArrowLeft />
      <h3 className='font-medium'>Sneakers</h3>
    </Link>
    <div className='w-[1/2] float-start'>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
    <section>
      <div>
        <h3>Brand</h3>
        <h2>Product Name</h2>
      </div>
      <div>
        <p><span>Product description</span></p>
      </div>
    </section>
  </div>
}

export default Product