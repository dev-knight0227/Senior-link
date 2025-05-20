"use client"
import PageHeader from '@/components/pageHeader/PageHeader'
import ServicesPageMainSection from '@/components/servicesPageMainSection/ServicesPageMainSection';
import GreenBanner from '@/components/greenBanner/GreenBanner';
import React from 'react';
import { useLang } from '@/contexts/LangContext';

const TermsOfUse = () => {
    const {messages} = useLang();
  return (
    <>
      <PageHeader
        bgImg={
          "/images/painting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        pageTitle = {messages['termsofuseTitle']}
      />
      <ServicesPageMainSection />
      <GreenBanner />
    </>
  );
}

export default TermsOfUse;