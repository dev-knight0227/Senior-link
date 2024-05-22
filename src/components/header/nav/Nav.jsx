"use client";
import React, { useContext } from "react";
import NavLink from "./navLink/NavLink";
import styles from "./nav.module.css";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import { NavContext } from "@/contexts/Nav";

const Nav = () => {
  const { isMenuOpened, setIsMenuOpened } = useContext(NavContext);
  return (
    <nav
      onClick={() => setIsMenuOpened((prev) => !prev)}
      className={`${styles.nav} ${
        isMenuOpened && styles.navActive
      } flex gap-0.5 md:gap-4 shadow md:shadow-none dark:bg-slate-800`}
    >
      <NavLink path="/">Home</NavLink>
      <NavLink path="/about-us">About Us</NavLink>
      <NavLink path="/services">Services</NavLink>
      <NavLink path="/amenities">Amenities</NavLink>
      <NavLink path="/cost-and-payment">Cost & Payment</NavLink>
      <div className="md:hidden mt-10">
        <PrimaryButton>Contact Us</PrimaryButton>
      </div>
    </nav>
  );
};

export default Nav;
