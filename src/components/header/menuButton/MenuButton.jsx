"use client"
import { useContext } from "react";
import styles from "./menuButton.module.css"
import { NavContext } from "@/contexts/Nav";

const MenuButton = () => {
  const { isMenuOpened, setIsMenuOpened } = useContext(NavContext);
  return (
    <button onClick={()=> setIsMenuOpened(prev => !prev)} className={`${styles.menuBtn} ${isMenuOpened && styles.activeMenuBtn}`}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default MenuButton