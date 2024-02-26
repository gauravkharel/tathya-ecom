import Image from 'next/image'
import products from '../../mock/mock.json'
import { Card } from '@/components/ui/card'
import Products from '@/components/Products'

const page = (): any => {
    return (
        <div >
            <span className='text-xl font-medium'>
                Shop your way out
                </span>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                <Products />
            </div>
        </div>
    )
}

export default page