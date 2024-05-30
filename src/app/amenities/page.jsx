import AccessibilityFeaturesSection from '@/components/accessibilityFeaturesSection/AccessibilityFeaturesSection';
import CommonAreaSection from '@/components/commonAreaSection/CommonAreaSection';
import IndoorOutdoorSection from '@/components/indoorOutdoorSection/IndoorOutdoorSection';
import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react'

export const metadata = {
  title: "Senior Care | Amenities",
  description: "It is Senior Care Website. It is Created by using Modern Technology Next JS",
};
const Amenities = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/8292823/pexels-photo-8292823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        pageTitle="Amenities"
      />
      <IndoorOutdoorSection />
      <CommonAreaSection />
      <AccessibilityFeaturesSection />
    </>
  );
}

export default Amenities