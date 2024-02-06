import RentSlider from "@/components/homePage/RentSlider/RentSlider";
import SaleSlider from "@/components/homePage/SaleSlider/SaleSlider";
import Footer from "@/layouts/Footer/Footer";
import Navbar from "@/layouts/Navbar/Navbar";
import HeroSlider from "../../../components/homePage/HeroSlider/HeroSlider";
import MobileNav from "@/layouts/MobileNav/MobileNav";
import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import Disclaimer from "@/components/homePage/Disclaimer/Disclaimer";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";

export default function Home() {
  useDocumentTitle("Home");

  return (
    <ScrollToTop>
      <div>
        <Navbar />
        {/* Main */}
        <div className="">
          <div className="space-y-4 mx-auto">
            {/* <h1 className="text-4xl font-bold ps-2 underline decoration-primary underline-offset-4">
                Recommended
              </h1> */}
            <HeroSlider />
          </div>
          <div className="container mx-auto px-0 lg:px-8 pb-8">
            {/* Rents */}
            <div className="mt-10 px-2">
              <RentSlider />
            </div>
            {/* Sales */}
            <div className="mt-10 px-2">
              <SaleSlider />
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
        {/* Mobile Navbar */}
        <MobileNav />
        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </ScrollToTop>
  );
}
