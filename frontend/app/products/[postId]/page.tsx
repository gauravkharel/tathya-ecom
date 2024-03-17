import { ZodNumber } from 'zod'
import products from '../../../mock/mock.json'
import Product from '@/components/product/Product'

interface PageProps {
    params: {
      productId: number
    }
}
const page = ({params}: PageProps) => {
    return <>hi</>
}

export default page