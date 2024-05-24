import AccessibilityFeaturesSection from '@/components/accessibilityFeaturesSection/AccessibilityFeaturesSection';
import CommonAreaSection from '@/components/commonAreaSection/CommonAreaSection';
import IndoorOutdoorSection from '@/components/indoorOutdoorSection/IndoorOutdoorSection';
import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react'

const Amenities = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        pageTitle="Amenities"
      />
      <IndoorOutdoorSection/>
      <CommonAreaSection/>
      <AccessibilityFeaturesSection/>
    </>
  );
}

export default Amenities