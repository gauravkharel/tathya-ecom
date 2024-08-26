import Products from '@/components/product/Products'

const Page = (): any => {
    return (
        <div className=''>
            <div className='sticky top-0 rounded-lg bg-white text-black'>
                <div className='p-4'>
                    <span className='text-xl font-medium'>Breadcrumbs</span>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-4 mt-8'>
                <Products />
            </div>
        </div>
    )
}

export default Page
