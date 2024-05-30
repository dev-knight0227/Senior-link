"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { bottomVariants } from "@/utils/framerMotionVariants/variants";

const GreenBanner = ({ data }) => {
  const { title, description, btnText, btnHref } = data;
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <motion.div
        className="container mx-auto px-20 py-20 bgLinearGreen rounded-sm"
        variants={bottomVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.5, staggerChildren: 0.5 }}
      >
        {/* Here class: bgLinearGreen is a Custom Class, defined in globals.css */}
        <motion.h2
          variants={bottomVariants}
          className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={bottomVariants}
          className="font-light mb-8 text-justify lg:w-4/5"
        >
          {description}
        </motion.p>
        <motion.div
          variants={bottomVariants}
          className="btnBox text-center sm:text-start"
        >
          <Link
            href={btnHref}
            className="bg-slate-200 px-5 py-2 text-slate-800 rounded-sm transition-all border border-transparent hover:text-slate-200 hover:border-slate-200 hover:bg-transparent"
          >
            {btnText}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GreenBanner;
