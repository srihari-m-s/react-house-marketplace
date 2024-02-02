import PageError from "@/components/shared/PageError/PageError";
import PageSpinner from "@/components/shared/PageSpinner/PageSpinner";
import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import useFetchSingleListing from "@/hooks/useFetchSingleListing/useFetchSingleListing";
import { useParams } from "react-router-dom";
import ContactListingOwner from "./Components/ContactListingOwner/ContactListingOwner";
import ListingDetails from "./Components/ListingDetails/ListingDetails";
import LocationLeaflet from "./Components/LocationLeaflet/LocationLeaflet";
import ImageCarousel from "@/components/homePage/ImageCarousel/ImageCarousel";

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
    <main className="pb-6 space-y-6">
      {/* Pictures slider */}
      <div className="">
        <ImageCarousel
          imageUrls={listingData.imageUrls}
          address={listingData.location}
          price={
            listingData.offer
              ? listingData.discountedPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : listingData.regularPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
          }
          hero={false}
        />
      </div>

      {/* Listing details */}
      <div className="space-y-4 max-w-2xl">
        <ListingDetails listingData={listingData} />
      </div>

      {/* Listing Location */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Location</h2>
        {/* Maps */}
        <LocationLeaflet
          position={Object.values(listingData.geolocation)}
          location={listingData.location}
        />
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
