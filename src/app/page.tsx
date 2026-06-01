import dynamic from "next/dynamic";
import Header from "@/components/header";
import Hero from "@/components/hero";

const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"));
const FeaturedProperties = dynamic(() => import("@/components/featured-properties"));
const PopularDestinations = dynamic(() => import("@/components/popular-destinations"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const Statistics = dynamic(() => import("@/components/statistics"));
const FAQ = dynamic(() => import("@/components/faq"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div data-section>
        <WhyChooseUs />
      </div>
      <div data-section>
        <Statistics />
      </div>
      <div data-section>
        <FeaturedProperties />
      </div>
      <div data-section>
        <PopularDestinations />
      </div>
      <div data-section>
        <HowItWorks />
      </div>
      <div data-section>
        <Testimonials />
      </div>
      <div data-section>
        <FAQ />
      </div>
      <div data-section>
        <Newsletter />
      </div>
      <div data-section>
        <Footer />
      </div>
    </>
  );
}
