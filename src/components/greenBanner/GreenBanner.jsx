import React from "react";
import Link from "next/link";

const GreenBanner = ({data}) => {
  const {title,description,btnText,btnHref} = data
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-20 py-20 bgLinearGreen rounded-sm">
        {/* Here class: bgLinearGreen is a Custom Class, defined in globals.css */}
        <h2 className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start">
          {title}
        </h2>
        <p className="font-light mb-8 text-justify lg:w-4/5">
          {description}
        </p>
        <div className="btnBox text-center sm:text-start">
          <Link
            href={btnHref}
            className="bg-slate-200 px-5 py-2 text-slate-800 rounded-sm transition-all border border-transparent hover:text-slate-200 hover:border-slate-200 hover:bg-transparent"
          >
            {btnText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GreenBanner;
