import NavbarUser from "./NavbarUser";
import LandingPageUser from "./LandingPageUser";
import Footer from "../../components/Footer";
import AboutUs from "../../pages/homepage/AboutUs";
import Testimonials from "../../pages/homepage/Testimonials";
import WhyWellEat from "../homepage/WhyWellEat";
import ChatWhatsApp from "./ChatWhatsApp"


const HomePageUser = () => {
  return (
    <>
      <section>
        <NavbarUser />
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
