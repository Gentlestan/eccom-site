import Image from "next/image";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
//import PromoBanner from "@/components/PromotionalBanner";
import PromoCarousel from "@/components/PromoCarousal";

export default function Home() {
  return (
   <div>
    <PromoCarousel/>
     <Hero />
     {/*<PromoBanner/>*/}
     <NewArrival />
   </div>
  );
}
