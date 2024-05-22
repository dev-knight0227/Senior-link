"use client"
import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
const ThemeButton = () => {
  const {mode,setMode} = useContext(ThemeContext)
  
  return (
    <button onClick={()=> setMode(mode === "dark" ? "light":"dark" )} className="text-2xl">
      {mode === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};

export default ThemeButton;
