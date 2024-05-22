"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({path,children}) => {
    const pathName = usePathname()
    // console.log(pathName);
  return (
    <Link
      href={path}
      className={`${
        path === pathName && "text-white bg-green-400 lg:text-green-500 lg:bg-transparent"
      } transition-all hover:text-green-500`}
    >
      {children}
    </Link>
  );
}

export default NavLink