import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CarSearch from "../../components/CarSearch/CarSearch";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import Categories from "../../components/Categories/Categories";
import AIConcierge from "../../components/AIConcierge/AIConcierge";
import CarDetails from "../../components/CarDetails/CarDetails";
import SellCar from "../../components/SellCar/SellCar";
import WhyMotora from "../../components/WhyMotora/WhyMotora";
import PremiumBrands from "../../components/PremiumBrands/PremiumBrands";
import Showroom from "../../components/Showroom/Showroom";
import FinalCTA from "../../components/FinalCTA/FinalCTA";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <CarSearch />
        <FeaturedCars />
        <Categories />
        <AIConcierge />
        <CarDetails />
        <SellCar />
        <WhyMotora />
        <PremiumBrands />
        <Showroom />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
};

export default Home;