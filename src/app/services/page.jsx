import PageHeader from '@/components/pageHeader/PageHeader'
import ServicesPageMainSection from '@/components/servicesPageMainSection/ServicesPageMainSection';
import GreenBanner from '@/components/greenBanner/GreenBanner';
import React from 'react'

export const metadata = {
  title: "SeniorLink | Services",
  description: "It is SeniorLink Website. It is Created by using Modern Technology Next JS",
};

const TermsOfUse = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "/images/painting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        pageTitle="Services"
      />
      <ServicesPageMainSection />
      <GreenBanner />
    </>
  );
}

export default TermsOfUse;