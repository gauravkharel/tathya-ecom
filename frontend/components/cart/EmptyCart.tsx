import Image from "next/image";
import EmptyImage from  '../../public/empty_cart.svg'
import Link from "next/link";

interface EmptyCartProps {

}

const EmptyCart = () => {
    return (
        <>
            <Image
                priority
                src= {EmptyImage}
                height={500}
                width={500}
                alt="Follow us on Twitter"
            />

            <h1>
                Your cart is empty.

                Browse prouct <Link className="text-blue-600" href={'/products'}>here</Link>
            </h1>
        </>
    );
}

export default EmptyCart;