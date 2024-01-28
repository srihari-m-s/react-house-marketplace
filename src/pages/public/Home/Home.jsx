import ImageCarousel from "@/components/homePage/ImageCarousel/ImageCarousel";
import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";
import Footer from "@/layouts/Footer/Footer";
import Navbar from "@/layouts/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Main */}
      <div className="">
        <div className="container mx-auto pb-8">
          <div className="2xl:w-10/12 space-y-4 mx-auto">
            {/* <h1 className="text-4xl font-bold ps-2 underline decoration-primary underline-offset-4">
              Recommended
            </h1> */}
            <ImageCarousel />
          </div>

          {/* Rents */}
          <div className="mt-10 space-y-4">
            <span className="flex justify-between">
              <h2 className="text-2xl text-primary font-semibold">
                Properties for Rent
              </h2>
              <Link
                to={"/rents"}
                className="flex items-center text-neutral-800/60 hover:text-neutral-800"
              >
                See More <span className="text-2xl ms-2">&rarr;</span>
              </Link>
            </span>
            <div className="overflow-x-auto">
              <div className="inline-flex gap-5 pb-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  return <PropertyCard key={index} />;
                })}
              </div>
            </div>
          </div>

          {/* Sales */}
          <div className="mt-10 space-y-4">
            <span className="flex justify-between">
              <h2 className="text-2xl text-primary font-semibold">
                Properties for Sale
              </h2>
              <Link
                to={"/rents"}
                className="flex items-center text-neutral-800/60 hover:text-neutral-800 "
              >
                See More <span className="text-2xl ms-2">&rarr;</span>
              </Link>
            </span>
            <div className="overflow-x-auto">
              <div className="inline-flex gap-5 pb-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  return <PropertyCard key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
