import Product from "@/components/product/Product"

interface PageProps {
  params: {
    productId: number
  }
}
const page = ({ params }: { params: { productId: number } }) => {
  return (
    <><Product productId={params.productId} /></>
  )
}

export default page