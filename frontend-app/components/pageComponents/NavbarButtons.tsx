'use client';

import Link from "next/link";

const NavbarButtons = ({}) => {
  return <div className="navbut flex flex-row gap-5 font-semibold">
    <Link href="/">Home</Link>
    <Link href="/browse">Browse</Link>
    <Link href="/categories">Categories</Link>
    <Link href="/" className="text-green-600">Become a Seller</Link>
  </div>
}

export default NavbarButtons