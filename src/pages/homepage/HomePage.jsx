import AboutUs from "./AboutUs";
import CardHome from "./CardHome";
import FAQSection from "./FaqSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "./HeroSection";
import LetsSignUp from "./LetsSignUp";
import Testimonials from "./Testimonials";
import WhyWellEat from "./WhyWellEat";

const HomePage = () => {
  return (
    <>
      <Header />
      <section id="home">
        <HeroSection />
        <CardHome />
      </section>
      <section id="about">
        <AboutUs />
        <WhyWellEat />
      </section>
      <section id="testimoni">
        <Testimonials />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
      <LetsSignUp />
      <Footer />
    </>
  );
};

export default HomePage;
