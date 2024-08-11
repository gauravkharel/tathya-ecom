import Product from "@/components/product/Product";

interface PageProps {
  params: {
    productId: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <Product id={params.productId} />
  );
};

export default Page;
