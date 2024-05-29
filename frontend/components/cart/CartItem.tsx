"use client"

import { LucideArrowLeft, LucideArrowRight, LucideX } from "lucide-react";
import { Button } from "../ui/Button";


const CartItem = ({  name, id, color, size, count, price }) => {

    const setProductCount = (count: number) => {
        if (count <= 0) {
            return;
        }
    }

    return (
        <tr>
            <td>
                <div className="cart-product">
                    <div className="cart-product__img">
                        {/* <img src={imageUrl} alt="" /> */}
                    </div>

                    <div className="cart-product__content">
                        <h3>{name}</h3>
                        <p>#{id}</p>
                    </div>
                </div>
            </td>
            <td className="cart-item-before" data-label="Color">{color}</td>
            <td className="cart-item-before" data-label="Size">{size}</td>
            <td>
                <div className="quantity-button">
                    <Button type="button" onClick={() => setProductCount(count - 1)}>
                        <LucideArrowLeft />
                    </Button>
                    <span>{count}</span>
                    <Button type="button" onClick={() => setProductCount(count - 1)}>
                        <LucideArrowRight />
                    </Button>
                </div>
            </td>
            <td>${price}</td>
            <td ><Button><LucideX /></Button></td>
        </tr>
    )
};


export default CartItem