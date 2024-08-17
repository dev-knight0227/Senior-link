"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../primaryButton/PrimaryButton";
import CareImg from "../../../public/care.png";

const CareCenter = () => {
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100 overflow-hidden">
      <div className="container mx-auto px-3 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="left flex-1">
          <h2 className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start">
            The Best Eldery Care Center For You
          </h2>
          <p className="font-light mb-8">
            Lorem ipsum dolor sit amet consectetur. Augue non malesuada placerat
            faucibus nam purus sem. Urna pulvinar porttitor dignissim congue
            pellentesque ac hac. Viverra donec nulla id enim posuere donec morbi
            dolor. Eu adipiscing massa ut proin mauris orci tincidunt ac in.
          </p>
          <div>
            <PrimaryButton>Learn More</PrimaryButton>
          </div>
        </div>
        <div className="right flex-1 flex justify-center lg:justify-end">
          <div className="img max-w-[450px] md:max-w-md">
            <Image src={CareImg} alt="Care Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareCenter;
