"use client";

import AboutUsDetail from '@/components/mission/Mission';
import GreenBanner from '@/components/greenBanner/GreenBanner';
import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react';
import { useLang } from "@/contexts/LangContext";

const AboutUs = () => {
  const { messages } = useLang();

  return (
    <>
      <PageHeader
        bgImg="/images/medicalquest.jpeg?auto=compress&cs=tinysrgb&w=600"
        pageTitle={messages["aboutusTitle"]}
      />
      <AboutUsDetail />
      <GreenBanner />
    </>
  );
};

export default AboutUs;
