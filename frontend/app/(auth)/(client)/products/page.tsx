import Products from '@/components/product/Products'
import Category from '@/components/product/Category'

const Page = (): any => {
    return (
        <div className=''>
            <div className='sticky top-0 rounded-lg bg-gray-500 text-white'>
                <div className='p-4'>
                    <span className='text-xl font-medium'>Breadcrumbs</span>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-4 mt-8'>
                <div className='col-span-1'>
                    <div className='sticky top-[80px]'> 
                        <Category />
                    </div>
                </div>
                <div className='col-span-5'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4'>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
