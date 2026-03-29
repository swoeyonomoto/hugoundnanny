import { LanguageProvider } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import StickyCta from "@/components/StickyCta";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import InquiryForm from "@/components/sections/InquiryForm";
import Footer from "@/components/sections/Footer";

const Index = () => (
  <LanguageProvider>
    <LangBar />
    <StickyCta />
    <Hero />
    <About />
    <Work />
    <Testimonials />
    <Pricing />
    <FAQ />
    <Contact />
    <InquiryForm />
    <Footer />
  </LanguageProvider>
);

export default Index;
