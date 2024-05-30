import DietaryServicesSection from '@/components/dietaryServicesSection/DietaryServicesSection';
import PageHeader from '@/components/pageHeader/PageHeader'
import ServicesPageMainSection from '@/components/servicesPageMainSection/ServicesPageMainSection';
import SocialActivities from '@/components/socialActivitiesSection/SocialActivities';
import React from 'react'

export const metadata = {
  title: "Senior Care | Services",
  description: "It is Senior Care Website. It is Created by using Modern Technology Next JS",
};

const Services = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/6129242/pexels-photo-6129242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        pageTitle="Services"
      />
      <ServicesPageMainSection />
      <DietaryServicesSection />
      <SocialActivities />
    </>
  );
}

export default Services