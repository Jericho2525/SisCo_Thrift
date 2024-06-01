import Hero from "../components/Hero"
import TopRated from "../components/TopRated";
import Popular from "../components/Popular"
import Offer from "../components/Offer";
import NewCollection from "../components/NewCollection";
import Footer from "../components/Footer";

function HomePage() {
 
  return (
    <div>
      <Hero/>
      <TopRated/>
      <Popular/>
      <Offer/>
      <NewCollection/>
      <Footer />
    </div>
  );
}

export default HomePage;
