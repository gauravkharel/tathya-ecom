'use client'
import { Headset, Heart, HelpCircleIcon, MapIcon, MapPin, Search, ShoppingBag, Smile, StoreIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import MainLogo from '../public/Logo-lockup.png'
import Image from 'next/image'
import SearchBar from './product/SearchBar'
import Logout from './auth/Logout'
interface MenubarProps {

}

const Navbar = ({ }) => {
  return (
    <header className=" sticky overflow-hidden top-0 inset-x-0 h-fit bg-white border-b border-zinc-300 z-[10] py-2">
      {/* ads above navbar */}
      <div className="container text-base  max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href='/'>
          <Image
            priority
            src={MainLogo}
            alt='logo'
            width={200}
            height={200}
          />
        </Link>
        {/* for small devices */}
        <div className='sm:hidden flex items-center gap-6  '>
          <div className='place-self-center'>
            <MapPin size={26}>Find a store</MapPin>
            Stores
          </div>
          <div>
            <Search size={26} >Search</Search>
            Search
          </div>

          <div>
            <ShoppingBag size={26}>cart</ShoppingBag>
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
        {/* login/profile component*/}
        <div className='sm:flex hidden flex-row gap-2 '>
          <Heart size={28}>like</Heart>
          <Logout />
          <Link href={'/cart'}>
            <ShoppingBag size={28}>cart</ShoppingBag>
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
  )
}

export default Navbar