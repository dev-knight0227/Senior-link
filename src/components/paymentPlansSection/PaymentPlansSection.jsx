"use client"
import { plans } from "./plans";
import PlanCard from "./planCard/PlanCard";
import { useState } from "react";

const PaymentPlansSection = () => {
  const [isMonthly,setIsMonthly] = useState(true)
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium mb-6">Payment Plans</h2>
        <div className="buttons flex justify-center w-min mx-auto border-2 rounded-sm border-green-400">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-6 py-1 ${isMonthly && "bg-green-600"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-6 py-1 border-s border-green-400 whitespace-nowrap ${
              !isMonthly && "bg-green-600"
            }`}
          >
            Yearly{" "}
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-sm">
              Save 20%
            </span>
          </button>
        </div>
        <div className="plans grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isMonthly={isMonthly} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentPlansSection;
