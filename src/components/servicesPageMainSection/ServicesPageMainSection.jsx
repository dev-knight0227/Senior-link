import React from "react";
import {  servicesMainData } from "./servicesPageData";
import ServicesPageItem from "./servicesPageItem/ServicesPageItem";

const ServicesPageMainSection = () => {
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3 flex flex-col gap-10 text-justify">
        {servicesMainData.map((data) => (
          <ServicesPageItem key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default ServicesPageMainSection;
