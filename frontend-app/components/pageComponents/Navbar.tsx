'use client';

import Link from "next/link";
import NavbarButtons from "./NavbarButtons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = ({}) => {

    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isHome = pathname === "/";

    useEffect(() => {
        if (!isHome) return;

        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", onScroll);
        
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome])

    const shouldUseWhiteBg = !isHome || scrolled;

  return <div 
  className={`nav min-h-[5rem] flex justify-between items-center px-10 fixed top-0 w-full z-50 transition-colors duration-200 ${
    shouldUseWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'
  }`}
  >
    <div>
        <h1>Logo</h1>
    </div>
    <div>
        <NavbarButtons />
    </div>
    <div className="flex flex-row gap-3">
        {/* if user is logged in 
        
            <img src={user.image} alt={user.name} />
            <Link>Cart</Link>
        */}
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
    </div>
  </div>
}

export default Navbar