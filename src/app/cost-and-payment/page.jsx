import GreenBanner from "@/components/greenBanner/GreenBanner";
import { cAndPPageGBData } from "@/components/greenBanner/greenBannerData";
import InsuranceAndMedicareSection from "@/components/insuranceAndMedicareSection/InsuranceAndMedicareSection";
import PageHeader from "@/components/pageHeader/PageHeader";
import PaymentPlansSection from "@/components/paymentPlansSection/PaymentPlansSection";
import React from "react";

const CostAndPayment = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        pageTitle="Cost & Payment"
      />
      <PaymentPlansSection />
      <InsuranceAndMedicareSection />
      <GreenBanner data={cAndPPageGBData} />
    </>
  );
};

export default CostAndPayment;
