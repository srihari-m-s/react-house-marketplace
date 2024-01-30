import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";
import Spinner from "@/components/shared/Spinner/Spinner";
import useFetchListings from "@/hooks/useFetchListings/useFetchListings";
import { Link } from "react-router-dom";

export default function RentSlider() {
  const { listings, loading } = useFetchListings("rent");

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <span className="flex justify-between">
        <h2 className="text-2xl text-primary font-semibold">
          Properties for Rent
        </h2>
        <Link
          to={"/category/rent"}
          className="flex items-center text-neutral-800/60 hover:text-neutral-800"
        >
          See More <span className="text-2xl ms-2">&rarr;</span>
        </Link>
      </span>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-5 pb-2">
          {listings.length ? (
            listings.map((_, index) => {
              return <PropertyCard key={index} />;
            })
          ) : (
            <p>No Listings for Rent</p>
          )}
        </div>
      </div>
    </div>
  );
}
