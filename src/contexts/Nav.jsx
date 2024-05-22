"use client"
import { createContext, useState } from "react";

export const NavContext = createContext()

const NavProvider = ({children})=>{

    const [isMenuOpened,setIsMenuOpened] = useState(false)

    const ctxVal = { isMenuOpened, setIsMenuOpened };
    return <NavContext.Provider value={ctxVal}>
        {children}
    </NavContext.Provider>
}

export default NavProvider