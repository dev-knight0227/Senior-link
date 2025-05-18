import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/aboutUsSection/AboutUs";
import Services from "@/components/servicesSection/Services";
import GreenBanner from "@/components/greenBanner/GreenBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs/>
      <Services/>
      <GreenBanner/>
    </>
  );
}
