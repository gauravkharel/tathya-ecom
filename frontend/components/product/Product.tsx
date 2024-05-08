"use client"
import { ArrowLeft, CarTaxiFrontIcon, LucideTicketCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import EmblaCarousel from '../ui/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import '../../public/embla.css'
import { Button } from '../ui/Button'
interface ProductProps {

}
const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Product: FC<ProductProps> = ({ }) => {
  const handleClick = () => {
    console.log("You clicked it.")
  }
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
        <h3 className='text-xl font-light text-gray-600 '>Adiddas</h3>
        <h2 className='text-xl font-bold text-cyan-600'>Samba 200</h2>
        <p>reviews</p>
      </div>
      <div>
        <p><span className='text-md'>Made with fine-tuned fabrication of newest arrivals.</span></p>
      </div>
      <div className='pt-3'>
        <p><span className='text-lg font-light line-through'>$100 </span><span className='text-xl text-cyan-600'> $200</span></p>
        <p><span className='text-lg font-light'>Only 10 left</span></p>
      </div>

      <div className='flex flex-col'>
        <p>
          <span className='text-cyan-400'><LucideTicketCheck className='text-cyan-400'></LucideTicketCheck> The product can be pickup from the station.</span>
        </p>
      </div>

      <Button variant="outline" onClick={handleClick}><CarTaxiFrontIcon className="mr-2 h-4 w-4"></CarTaxiFrontIcon>Add to cart</Button>
      <p>Hurry! this item is <span className='font-bold text-cyan-500'>selling like a wildfire.</span> </p>
    </section>
    <section>
      list of stuffs that are can be done
      add to fav
      and, so on

    </section>

    <section>
      reviews
    </section>
  </div>
}

export default Product