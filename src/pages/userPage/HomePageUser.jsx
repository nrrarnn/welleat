import LandingPageUser from "./LandingPageUser";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
        <Footer />
      </section>
    </>
  );
};

export default HomePageUser;
