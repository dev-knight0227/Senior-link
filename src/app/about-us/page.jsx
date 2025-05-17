import CareGivers from '@/components/careGivers/CareGivers';
import History from '@/components/history/History';
import Mission from '@/components/mission/Mission';
import PageHeader from '@/components/pageHeader/PageHeader'
import React from 'react'
export const metadata = {
  title: "Senior Link | About Us",
  description:
    "It is Senior Link Website. It is Created by using Modern Technology Next JS",
};
const AboutUs = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        pageTitle="About Us"
      />
      <Mission/>
      <History/>
      {/* <CareGivers/> */}
    </>
  );
}

export default AboutUs