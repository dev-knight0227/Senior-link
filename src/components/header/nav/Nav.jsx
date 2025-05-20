"use client";
import React, { useContext } from "react";
import NavLink from "./navLink/NavLink";
import styles from "./nav.module.css";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import { NavContext } from "@/contexts/Nav";
import { useLang } from "@/contexts/LangContext";

const Nav = () => {
  const { isMenuOpened, setIsMenuOpened } = useContext(NavContext);
  const {messages} = useLang();

  return (
    <nav
      onClick={() => setIsMenuOpened((prev) => !prev)}
      className={`${styles.nav} ${
        isMenuOpened && styles.navActive
      } flex gap-1 lg:gap-4 shadow lg:shadow-none dark:bg-slate-800 lg:dark:bg-transparent`}
    >
      <NavLink path="/">{messages['homeTitle']}</NavLink>
      <NavLink path="/about-us">{messages['aboutusTitle']}</NavLink>
      <NavLink path="/services">{messages['termsofuseTitle']}</NavLink>

      <div className="lg:hidden mt-10">
        <PrimaryButton>{messages['contactusTitle']}</PrimaryButton>
      </div>
    </nav>
  );
};

export default Nav;
