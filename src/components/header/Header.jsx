import Nav from "./nav/Nav";
import Image from "next/image";
import Logo from "../../../public/logo-no-background.svg";
import PrimaryButton from "../primaryButton/PrimaryButton";
import Link from "next/link";
import MenuButton from "./menuButton/MenuButton";
import ThemeButton from "./themeButton/ThemeButton";

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-800 dark:text-slate-100 shadow h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-3 h-full flex justify-between items-center py-2">
        <div className="logo">
          <Link href="/">
            {/* Logo */}
            <Image src={Logo} width={180}   alt="Senior Care Home" />
          </Link>
        </div>

        {/* Navbar Start */}
        <Nav />
        {/* Navbar End */}

        <div className="flex items-center gap-6">
          <ThemeButton />
          <div className="hidden lg:block">
            <PrimaryButton>Contact Us</PrimaryButton>
          </div>

          <div className="lg:hidden flex items-center">
            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
