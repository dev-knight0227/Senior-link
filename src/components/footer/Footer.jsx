import React from 'react'
import Logo from '../header/logo/Logo'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 dark:text-slate-300 py-5">
      <div className="container mx-auto px-3 font-light">
        <div className="top flex flex-col md:flex-row gap-8 py-8">
          <div className="left flex-1">
            <Logo />
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur. Augue non malesuada
              placerat faucibus nam purus sem. Urna pulvinar porttitor dignissim
              congue pellentesque ac hac.
            </p>
            <div className="icons flex gap-4 mt-4 text-xl">
              <Link className='transition-all hover:text-green-500' href="">
                <FaFacebookSquare />
              </Link>
              <Link className='transition-all hover:text-green-500' href="">
                <FaTwitterSquare />
              </Link>
              <Link className='transition-all hover:text-green-500' href="">
                <FaInstagramSquare />
              </Link>
              <Link className='transition-all hover:text-green-500' href="">
                <FaLinkedin />
              </Link>
            </div>
          </div>
          <div className="right flex-1 flex flex-col sm:flex-row justify-between gap-8">
            <div className="quick-links">
              <h3 className="text-md text-green-400 font-medium mb-3">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link className='transition-all hover:text-green-500' href="/">Home</Link>
                <Link className='transition-all hover:text-green-500' href="/about-us">About</Link>
                <Link className='transition-all hover:text-green-500' href="/portfolio">Portfolio</Link>
                <Link className='transition-all hover:text-green-500' href="/services">Services</Link>
              </div>
            </div>
            <div className="legal">
              <h3 className="text-md text-green-400 font-medium mb-3">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link className='transition-all hover:text-green-500' href="/">Terms of Service</Link>
                <Link className='transition-all hover:text-green-500' href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom text-center text-sm">
          <p>Copyright 2023 United Software Solutions, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer