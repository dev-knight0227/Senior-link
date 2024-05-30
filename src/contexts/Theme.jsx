"use client";
import Loading from "@/app/loading";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("mode")) {
      // console.log("Run");
      localStorage.setItem("mode", "light");
      setMode("light")
    } else {
      setMode(() => localStorage.getItem("mode"));
      // console.log(localStorage.getItem("mode"), "X");
      // localStorage.setItem("mode", localStorage.getItem("mode"));
      // console.log(localStorage.getItem("mode"), "Xp");
    }
    // console.log("Mode:",mode,localStorage.getItem("mode"));
  }, []);

  useEffect(() => {
    if (mode) {
      // console.log("M", mode);
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <div className={mode && mode}>{mode ? children : <Loading />}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
