import NavbarUser from "./NavbarUser";
import LandingPageUser from "./LandingPageUser";
import Footer from "../../components/Footer";


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
        <Footer />
      </section>
      {/* <section>
        <UserCard />
      </section> */}
    </>
  );
};

export default HomePageUser;
