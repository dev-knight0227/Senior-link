"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "./nav/Nav";
import PrimaryButton from "../primaryButton/PrimaryButton";
import MenuButton from "./menuButton/MenuButton";
import Logo from "./logo/Logo";
import { User, Users, FilePlus, LogOut, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const Header = () => {
  const { messages, switchLocale, locale } = useLang();
  const { user, loading } = useAuth();
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isList, setIsList] = useState(false);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
    
  }, []);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.email);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsAdmin(userData.isAdministrator === true);
            setIsList(userData.setList === true);
          } else {
            setIsAdmin(false);
            setIsList(false);
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setIsAdmin(false);
          setIsList(false);
        }
      } else {
        setIsAdmin(false);
        setIsList(false);
      }
    };
  
    fetchAdminStatus();
  }, [user]);
  

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
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 shadow-xl rounded-xl overflow-hidden ring-1 ring-black ring-opacity-5 z-50">
                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {messages["signasLabel"]}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1">
                    {isList?<Link
                      href="/profile"
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User size={16} className="text-[#0077C8]" />
                      <span>{messages["profileTitle"]}</span>
                    </Link>:<Link
                      href="/add-list"
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <FilePlus size={16} className="text-[#0077C8]" />
                      <span>{messages["addlistTitle"]}</span>
                    </Link>}

                    {isAdmin && <Link
                      href="/admin"
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Users size={16} className="text-[#0077C8]" />
                      <span>{messages["managelistTitle"]}</span>
                    </Link>}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-5 py-3 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-red-400 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>{messages["logoutTitle"]}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/signin"
                className="text-sm font-medium hover:text-violet-600"
              >
                {messages["signinTitle"]}
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium hover:text-violet-600"
              >
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
