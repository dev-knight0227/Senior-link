"use client"
import React from 'react'
import Logo from '../header/logo/Logo'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { FaTwitterSquare } from "react-icons/fa";
import { motion } from 'framer-motion';
import { bottomVariants } from '@/utils/framerMotionVariants/variants';

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 dark:text-slate-300 py-5">
      <div className="container mx-auto px-3 font-light">
        <div className="top flex flex-col md:flex-row gap-8 py-8">
          <motion.div
            className="left flex-1"
            variants={bottomVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5, staggerChildren: 0.75 }}
          >
            <motion.div variants={bottomVariants}>
              <Logo />
            </motion.div>
            <motion.p className="mt-5" variants={bottomVariants}>
              Lorem ipsum dolor sit amet consectetur. Augue non malesuada
              placerat faucibus nam purus sem. Urna pulvinar porttitor dignissim
              congue pellentesque ac hac.
            </motion.p>
            <motion.div
              className="icons flex gap-4 mt-4 text-xl"
              variants={bottomVariants}
              transition={{ staggerChildren: 0.5 }}
            >
              <motion.div variants={bottomVariants}>
                <Link className="transition-all hover:text-green-500" href="">
                  <FaFacebookSquare />
                </Link>
              </motion.div>
              <motion.div variants={bottomVariants}>
                <Link className="transition-all hover:text-green-500" href="">
                  <FaTwitterSquare />
                </Link>
              </motion.div>
              <motion.div variants={bottomVariants}>
                <Link className="transition-all hover:text-green-500" href="">
                  <FaInstagramSquare />
                </Link>
              </motion.div>
              <motion.div variants={bottomVariants}>
                <Link className="transition-all hover:text-green-500" href="">
                  <FaLinkedin />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="right flex-1 flex flex-col sm:flex-row justify-between gap-8">
            <motion.div className="quick-links">
              <motion.h3 className="text-md text-green-400 font-medium mb-3">
                Quick Links
              </motion.h3>
              <motion.div
                className="flex flex-col gap-2"
                variants={bottomVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.5, staggerChildren: 0.75 }}
              >
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/about-us"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/portfolio"
                  >
                    Portfolio
                  </Link>
                </motion.div>
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/services"
                  >
                    Services
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className="legal">
              <motion.h3 className="text-md text-green-400 font-medium mb-3">
                Legal
              </motion.h3>
              <motion.div
                className="flex flex-col gap-2"
                variants={bottomVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.5, staggerChildren: 0.75 }}
              >
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/"
                  >
                    Terms of Service
                  </Link>
                </motion.div>
                <motion.div variants={bottomVariants}>
                  <Link
                    className="transition-all hover:text-green-500"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
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