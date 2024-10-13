'use client'

import { useState, useEffect } from 'react'
import NestedMenu from './navbar/NestedMenu'
import PrimaryHeader from './layout/PrimaryHeader'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
      className={`${isVisible ? 'top-0' : '-top-full'
        } sticky transition-all duration-300 ease-in-out inset-x-0 h-fit bg-white border-b border-zinc-300 z-[10] py-2`}
    >
      {/* main header of the client */}
      <PrimaryHeader />
      {/* secondary header of the client - comprises of categories */}
      <NestedMenu />
    </header>
  );
};

export default Navbar;
