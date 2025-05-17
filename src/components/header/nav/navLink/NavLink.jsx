"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({path,children}) => {
    const pathName = usePathname()
    // console.log(pathName);
  return (
    <Link
      href={path}
      className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ease-in-out transform 
        ${path === pathName 
          ? "text-white bg-green-400 shadow-md shadow-green-300/30 lg:text-green-400 lg:bg-transparent lg:border-b-2 lg:border-green-400 lg:rounded-none lg:shadow-none lg:font-semibold" 
          : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/20"
        } 
        hover:text-[#206645] hover:scale-105 lg:hover:scale-100 lg:hover:border-green-400/50 lg:mx-1 relative overflow-hidden
        before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0 before:bg-green-400/10 hover:before:h-full before:transition-all before:duration-300 before:-z-10
      `}
      data-abc={true}
    >
      {children}
    </Link>
  );
}

export default NavLink