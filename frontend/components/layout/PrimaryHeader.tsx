'use client'


import { FC } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Headset, Heart, MapPin, Search, ShoppingCart, User2 } from 'lucide-react'
import MainLogo from '../../public/Logo-lockup.png'
import { isEmptyArray } from '@/lib/utils'
import Logout from "../auth/Logout";
import { useCart } from "@/providers/CartProvider";

interface PrimaryHeaderProps {

}

const PrimaryHeader: FC<PrimaryHeaderProps> = () => {
  const { cart } = useCart();

  return (<>
    <div className="container text-base max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
      <Link href='/home'>
        <Image
          priority
          src={MainLogo}
          alt='logo'
          width={200}
          height={200}
        />
      </Link>
      <div className='sm:hidden flex items-center gap-6'>
        <div className='place-self-center'>
          <MapPin size={26}>Find a store</MapPin>
          Stores
        </div>
        <div>
          <Search size={26}>Search</Search>
          Search
        </div>
        <div>
          <ShoppingCart size={26}>cart</ShoppingCart>
          Cart
        </div>
      </div>
      <div className='sm:flex flex-row gap-4 hidden'>
        <div className='flex flex-row gap-2'>
          <Headset>Support</Headset>
          Support
        </div>
        <div className='sm:flex flex-row gap-2 hidden'>
          <MapPin>Find a store</MapPin>
          Find a store
        </div>
      </div>
      <div className='sm:flex hidden flex-row gap-4'>
        <Heart size={28}>like</Heart>
        <Link href={'/me'}>
          <User2 fill='white' size={28}>User</User2>
        </Link>
        <Logout />
        <Link href={'/cart'}>
          <ShoppingCart fill='white' size={28}>cart</ShoppingCart>
          {isEmptyArray(cart) ? null : (
            <div className='relative z-[-1] left-4 bottom-9 w-5 h-5 rounded-full bg-red-600'>
              <span className='relative bottom-1 pl-1.5 text-xs font-bold text-white'>{cart.length}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  </>);
}

export default PrimaryHeader;