import LandingPageUser from "./LandingPageUser";
import ChatWhatsApp from "./ChatWhatsApp"
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import AboutUs from "../../pages/homepage/AboutUs"
import WhyWellEat from "../../pages/homepage/WhyWellEat"
import Testimonials from "../../pages/homepage/Testimonials"

const HomePageUser = () => {
  return (
    <>
      <section>
        <Header />
      </section>
      <section>
        <LandingPageUser />
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <WhyWellEat />
      </section>
      <section>
        <Testimonials />
      </section>
      <section>
        <ChatWhatsApp />
      </section>
      <section>
        <Footer />
      </section>
      {/* <section>
        <UserCard />
      </section> */}
    </>
  );
};

export default HomePageUser;
