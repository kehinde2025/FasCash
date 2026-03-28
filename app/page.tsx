import Advantages from "@/components/Advantages";
import ClientReviews from "@/components/ClientReviews";
import CTA from "@/components/CTA";
import GivingBack from "@/components/GivingBack";
import FAQ from "@/components/FAQs";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import LoanApplication from "@/components/LoanApplication";
import Stats from "@/components/StatsBar";

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <Advantages />
      <Process />
      <Stats />
      <GivingBack />
      <ClientReviews />
      <FAQ />
      <CTA />
      <LoanApplication />
    </main>
  );
}