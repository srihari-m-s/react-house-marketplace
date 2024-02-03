import RentSlider from "@/components/homePage/RentSlider/RentSlider";
import SaleSlider from "@/components/homePage/SaleSlider/SaleSlider";
import Footer from "@/layouts/Footer/Footer";
import Navbar from "@/layouts/Navbar/Navbar";
import HeroSlider from "./Components/HeroSlider/HeroSlider";
import MobileNav from "@/layouts/MobileNav/MobileNav";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Main */}
      <div className="">
        <div className="container mx-auto pb-8">
          <div className="space-y-4 mx-auto">
            {/* <h1 className="text-4xl font-bold ps-2 underline decoration-primary underline-offset-4">
              Recommended
            </h1> */}
            <HeroSlider />
          </div>

          {/* Rents */}
          <div className="mt-10">
            <RentSlider />
          </div>

          {/* Sales */}
          <div className="mt-10">
            <SaleSlider />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      {/* Mobile Navbar */}
      <MobileNav />
    </div>
  );
}
