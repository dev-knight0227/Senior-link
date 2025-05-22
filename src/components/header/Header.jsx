"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "./nav/Nav";
import PrimaryButton from "../primaryButton/PrimaryButton";
import MenuButton from "./menuButton/MenuButton";
import Logo from "./logo/Logo";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth";

const Header = () => {
  const { messages, switchLocale, locale } = useLang();
  const { user, loading } = useAuth();
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAvatarMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-3 h-full flex justify-between items-center py-2">
        <Logo />
        <Nav />
        <select value={locale} onChange={(e) => switchLocale(e.target.value)}>
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>

        <div className="flex items-center gap-6">
          <Link href="/contact-us">
            <div className="hidden lg:block">
              <PrimaryButton>{messages["contactusTitle"]}</PrimaryButton>
            </div>
          </Link>

          {!loading && user ? (
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={() => setIsAvatarMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isAvatarMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAvatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 shadow-lg rounded-xl z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-500">{messages["signasLabel"]}</p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700">
                    {messages["profileTitle"]}
                  </Link>
                  <Link href="/admin" className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700">
                    {messages["managelistTitle"]}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {messages["logoutTitle"]}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/signin" className="text-sm font-medium hover:text-violet-600">
                {messages["signinTitle"]}
              </Link>
              <Link href="/signup" className="text-sm font-medium hover:text-violet-600">
                {messages["signupTitle"]}
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
