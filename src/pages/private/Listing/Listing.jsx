import PageError from "@/components/shared/PageError/PageError";
import PageSpinner from "@/components/shared/PageSpinner/PageSpinner";
import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import useFetchSingleListing from "@/hooks/useFetchSingleListing/useFetchSingleListing";
import { useParams } from "react-router-dom";
import ContactListingOwner from "./Components/ContactListingOwner/ContactListingOwner";
import ListingDetails from "./Components/ListingDetails/ListingDetails";

export default function Listing() {
  const { listingId } = useParams();
  const { user } = useAuthStatus();

  const { listingData, loading, error } = useFetchSingleListing(listingId);

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <main className="py-6 space-y-6">
      {/* Pictures slider */}
      <p className="">Pictures Slider</p>

      {/* Listing details */}
      <div className="space-y-4 max-w-2xl">
        <ListingDetails listingData={listingData} />
      </div>

      {/* Listing Location */}
      <div className="">
        <h2 className="text-2xl font-bold">Location</h2>
        {/* Maps */}
      </div>

      {/* Contact Landlord */}
      <div className={`empty:hidden`}>
        {user?.uid !== listingData.userRef ? (
          <ContactListingOwner
            name={listingData.name}
            listingOwnerId={listingData.userRef}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
