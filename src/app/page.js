import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/aboutUsSection/AboutUs";
import Services from "@/components/servicesSection/Services";
import CareCenter from "@/components/careCenterSection/CareCenter";
import GreenBanner from "@/components/greenBanner/GreenBanner";
import ClientReviews from "@/components/clientReviewsSection/ClientReviews";
import { homePageGBData } from "@/components/greenBanner/greenBannerData";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs/>
      <Services/>
      <ClientReviews/>
      <CareCenter/>
      <GreenBanner data={homePageGBData}/>
    </>
  );
}
