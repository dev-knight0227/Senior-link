import React from "react";
import { dietaryServicesData } from "./dietaryServicesData";
import DietaryServiceCard from "./dietaryServiceCard/DietaryServiceCard";

const DietaryServicesSection = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium text-center">
          Dietary Services
        </h2>
        <div
          className="dietary-services grid gap-8 mt-10 justify-center"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(18rem,1fr))" }}
        >
          {dietaryServicesData.map((dietaryData) => (
            <DietaryServiceCard
              key={dietaryData.id}
              dietaryData={dietaryData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DietaryServicesSection;
