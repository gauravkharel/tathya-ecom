'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Headset, Heart, MapPin, Search, ShoppingCart } from 'lucide-react'
import MainLogo from '../public/Logo-lockup.png'
import SearchBar from './product/SearchBar'
import Logout from './auth/Logout'
import { useCart } from '@/providers/CartProvider'
import { isEmptyArray } from '@/lib/utils'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cart } = useCart();

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  });

  return (
    <header
      className={`${
        isVisible ? 'top-0' : '-top-full'
      } sticky transition-all duration-300 ease-in-out inset-x-0 h-fit bg-white border-b border-zinc-300 z-[10] py-2`}
    >
      <div className="container text-base max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href='/'>
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

      <div className='pt-4 container text-lg border-b border-zinc-200 max-w-7xl h-full mx-auto sm:flex items-start justify-start gap-3 hidden'>
        <Link href={'/products'} className='font-bold'>ALL</Link>
        <div>WOMEN</div>
        <div>MEN</div>
        <div>KIDS</div>
      </div>
      <div className='container text-base max-w-7xl h-full mx-auto sm:flex justify-between gap-2 hidden'>
        <div>Empty for now | nav later</div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
