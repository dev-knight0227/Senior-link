import DietaryServicesSection from '@/components/dietaryServicesSection/DietaryServicesSection';
import PageHeader from '@/components/pageHeader/PageHeader'
import ServicesPageMainSection from '@/components/servicesPageMainSection/ServicesPageMainSection';
import SocialActivities from '@/components/socialActivitiesSection/SocialActivities';
import React from 'react'

const Services = () => {
  return (
    <>
      <PageHeader
        bgImg={
          "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        pageTitle="Services"
      />
      <ServicesPageMainSection/>
      <DietaryServicesSection/>
      <SocialActivities/>
    </>
  );
}

export default Services