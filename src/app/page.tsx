

import Banner from "../components/Banner";
import Features from "../components/Features";
import Programs from "../components/Programs";
import WhyJoin from "../components/WhyJoin";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <main>
      <Header/>
      <Banner />
      <Features />
      <Programs />
      <WhyJoin />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
