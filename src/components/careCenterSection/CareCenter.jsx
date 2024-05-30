"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../primaryButton/PrimaryButton";
import CareImg from "../../../public/care.png";
import { motion } from "framer-motion";
import {
  bottomVariants,
  scaleVariants,
} from "@/utils/framerMotionVariants/variants";
const CareCenter = () => {
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100 overflow-hidden">
      <div className="container mx-auto px-3 flex flex-col gap-10 lg:flex-row lg:items-center">
        <motion.div
          className="left flex-1"
          variants={bottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.5, staggerChildren: 0.5 }}
        >
          <motion.h2
            variants={bottomVariants}
            className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start"
          >
            The Best Eldery Care Center For You
          </motion.h2>
          <motion.p variants={bottomVariants} className="font-light mb-8">
            Lorem ipsum dolor sit amet consectetur. Augue non malesuada placerat
            faucibus nam purus sem. Urna pulvinar porttitor dignissim congue
            pellentesque ac hac. Viverra donec nulla id enim posuere donec morbi
            dolor. Eu adipiscing massa ut proin mauris orci tincidunt ac in.
          </motion.p>
          <motion.div variants={bottomVariants}>
            <PrimaryButton>Learn More</PrimaryButton>
          </motion.div>
        </motion.div>
        <div className="right flex-1 flex justify-center lg:justify-end">
          <motion.div
            className="img max-w-[450px] md:max-w-md"
            variants={scaleVariants}
            transition={{ type: "spring", stiffness: 150 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
          >
            <Image src={CareImg} alt="Care Image" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareCenter;
