"use client"
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../../../public/logo-no-background.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { topToBottom } from "@/utils/gsapAnimationJs/gsapAnimation";

const Logo = () => {
  const logoRef = useRef()
  useGSAP(()=>{
    topToBottom({ele:logoRef.current,delay:.5,duration:.5})
  },[])
  return (
    <div className="logo" ref={logoRef}>
      <Link href="/">
        <Image src={LogoImg} width={180} alt="Senior Care Home" />
      </Link>
    </div>
  );
};

export default Logo;
