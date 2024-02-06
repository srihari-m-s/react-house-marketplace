import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";
import Spinner from "@/components/shared/Spinner/Spinner";
import useFetchShortlisted from "@/hooks/useFetchShortlisted/useFetchShortlisted";
import { Link } from "react-router-dom";

export default function ShortlistedListings({ user }) {
  const { loading, error, shortlistedListings } = useFetchShortlisted(
    user.shortlisted
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong with fetching your listings.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="">
        <h2 className="text-2xl">Shortlisted Listings</h2>
        <hr className="mt-1" />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-5 pb-2">
          {shortlistedListings.length ? (
            shortlistedListings.map((listing) => {
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
            <p>
              I guess You have no shortlisted listings. Head over to
              <Link to={"/create-listing"} className="text-primary font-bold">
                Home
              </Link>{" "}
              to check out listings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
