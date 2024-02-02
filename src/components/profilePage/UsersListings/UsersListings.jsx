import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";
import Spinner from "@/components/shared/Spinner/Spinner";
import useFetchUserListings from "@/hooks/useFetchUserListings/useFetchUserListings";
import { Link } from "react-router-dom";

export default function UsersListings({ user }) {
  const { userListings, loading, error, handleDelete } = useFetchUserListings(
    user.uid
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
        <h2 className="text-2xl">Your Listings</h2>
        <hr className="mt-1" />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-5 pb-2">
          {userListings.length ? (
            userListings.map((listing) => {
              return (
                <PropertyCard
                  key={listing.id}
                  categoryName={"rent"}
                  listingData={listing.data}
                  listingId={listing.id}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : (
            <p>
              I guess You have no listings. Lets go{" "}
              <Link to={"/create-listing"} className="text-primary font-bold">
                Create one?
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
