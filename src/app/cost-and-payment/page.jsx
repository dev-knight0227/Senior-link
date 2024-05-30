import GreenBanner from "@/components/greenBanner/GreenBanner";
import { cAndPPageGBData } from "@/components/greenBanner/greenBannerData";
import InsuranceAndMedicareSection from "@/components/insuranceAndMedicareSection/InsuranceAndMedicareSection";
import PageHeader from "@/components/pageHeader/PageHeader";
import PaymentPlansSection from "@/components/paymentPlansSection/PaymentPlansSection";
import React from "react";
export const metadata = {
  title: "Senior Care | Cost & Payment",
  description: "It is Senior Care Website. It is Created by using Modern Technology Next JS",
};
const CostAndPayment = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/4968663/pexels-photo-4968663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
