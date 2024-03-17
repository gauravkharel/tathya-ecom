import Image from 'next/image'
import products from '../../mock/mock.json'
import { Card } from '@/components/ui/Card'
import Products from '@/components/product/Products'
import FilterNav from '@/components/product/FilterNav'
import Category from '@/components/product/Category'
// import FilterBy from '@/components/product/FilterOption'

const page = (): any => {
    return (
        <div >
            <span className='text-xl font-medium'>
                Shop your way out
                Breadcrumbs
                Image here
            </span>
            <div className='flex flex-row '>
                <div className='w-1/3'>
                    <Category />
                </div>
                <div className='w-2/3'>
                    <FilterNav />
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page