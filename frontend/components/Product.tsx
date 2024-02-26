import Image from "next/image"


const Product = ({id, imageurl, brand, price,  colors}:any ) => {
    return
    <div key={id}>
        <div>
            <Image src={imageurl} alt={brand} width={250} height={250} />
        </div>
        <div>
            <div className='text-lg'>{brand}</div>
            <div>{colors}</div>
            <div>{price}</div>
            {/* need to add reviews too,in the schema */}
            <div>reviews - to be done</div>
        </div>
    </div>

}

export default Product