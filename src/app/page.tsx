import {
  Contact,
  Flagship,
  Hero,
  HowWeWork,
  InsideProduct,
  Services,
  TeamSection,
  WhyWeExist,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyWeExist />
      <Flagship />
      <InsideProduct />
      <Services />
      <HowWeWork />
      <TeamSection />
      <Contact />
    </>
  );
}
