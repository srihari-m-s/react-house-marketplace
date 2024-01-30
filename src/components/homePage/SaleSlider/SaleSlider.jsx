import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";
import Spinner from "@/components/shared/Spinner/Spinner";
import useFetchListings from "@/hooks/useFetchListings/useFetchListings";
import { Link } from "react-router-dom";

export default function SaleSlider() {
  const { listings, loading } = useFetchListings("type", "sale");

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <span className="flex justify-between">
        <h2 className="text-2xl text-primary font-semibold">
          Properties for Sale
        </h2>
        <Link
          to={"/category/sale"}
          className="flex items-center text-neutral-800/60 hover:text-neutral-800 "
        >
          See More <span className="text-2xl ms-2">&rarr;</span>
        </Link>
      </span>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-5 pb-2">
          {listings.length ? (
            listings.map((listing) => {
              return (
                <PropertyCard
                  key={listing.id}
                  categoryName={"rent"}
                  listingData={listing.data}
                  listingId={listing.id}
                />
              );
            })
          ) : (
            <p>No Listings for Sale</p>
          )}
        </div>
      </div>
    </div>
  );
}
