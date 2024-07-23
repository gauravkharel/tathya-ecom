import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import Products from '@/components/product/Products'
import Category from '@/components/product/Category'

const page = (): any => {
    return (
        <div >
            <span className='text-xl font-medium'>
                Shop your way out
                <br/>
                Breadcrumbs
                <br/>
                Image here
            </span>
            <div className='flex flex-row '>
                <div className='w-1/3'>
                    <Category />
                </div>
                <div className='w-2/3'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2'>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page