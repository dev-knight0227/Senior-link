"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import Nav from "./nav/Nav";
import PrimaryButton from "../primaryButton/PrimaryButton";
import MenuButton from "./menuButton/MenuButton";
// import ThemeButton from "./themeButton/ThemeButton";
import Logo from "./logo/Logo";
import { User, LogIn, LogOut, ChevronDown } from "lucide-react";
// import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useLang } from "@/contexts/LangContext";

const Header = () => {
  // Auth state - in a real app, this would come from your auth context/provider
  const {messages, switchLocale, locale } = useLang();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);

  // Close avatar menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen((prev) => !prev);
  };

  // Mock login function (for demo purposes)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAvatarMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 dark:text-slate-100 shadow h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-3 h-full flex justify-between items-center py-2">
        {/* Logo Start */}
        <Logo />
        {/* Logo End */}

        {/* Navbar Start */}
        <Nav />
        {/* Navbar End */}

        {/* Language Toggle */}
        <select value={locale} onChange={(e) => switchLocale(e.target.value)}>
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
        {/* End Language Toggle */}
        <div className="flex items-center gap-6">
          {/* <ThemeButton /> */}
          <Link href="/contact-us">
            <div className="hidden lg:block">
              <PrimaryButton>{messages['contactusTitle']}</PrimaryButton>
            </div>
          </Link>

          {/* Auth Section - Conditional Rendering */}
          {isLoggedIn ? (
            // Avatar for logged in users
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={toggleAvatarMenu}
                className="flex items-center gap-2 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-700 p-1"
                aria-expanded={isAvatarMenuOpen}
                aria-haspopup="true"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 border-white dark:border-slate-700">
                  <User size={20} />
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-600 dark:text-slate-300 transition-transform duration-200 ${
                    isAvatarMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Avatar Dropdown Menu */}
              {isAvatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transform origin-top-right transition-all duration-200">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {messages['signasLabel']}
                      </p>
                      <p className="text-sm font-medium truncate">
                        user@example.com
                      </p>
                    </div>
                    <a
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      <User size={18} className="text-violet-500" />
                      <span>{messages['profileTitle']}</span>
                    </a>
                    <a
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      <User size={18} className="text-violet-500" />
                      <span>{messages['managelistTitle']}</span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      <LogOut size={18} className="text-red-500" />
                      <span>{messages['logoutTitle']}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Sign In and Sign Up buttons for logged out users
            <div className="flex items-center gap-3">
              <Link href="/signin" onClick={() => handleLogin()}>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                  {messages['signinTitle']}
                </span>
              </Link>
              {/* Replace button with Link component */}
              <Link href="/signup">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                  {messages['signupTitle']}
                </span>
              </Link>
            </div>
          )}

          <div className="lg:hidden flex items-center">
            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
