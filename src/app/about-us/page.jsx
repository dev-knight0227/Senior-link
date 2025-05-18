import AboutUsDetail from '@/components/mission/Mission';
import PageHeader from '@/components/pageHeader/PageHeader'
import React from 'react'
export const metadata = {
  title: "SeniorLink | About Us",
  description:
    "It is SeniorLink Website. It is Created by using Modern Technology Next JS",
};
const AboutUs = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "/images/medicalquest.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        pageTitle="About Us"
      />
      <AboutUsDetail />
    </>
  );
}

export default AboutUs