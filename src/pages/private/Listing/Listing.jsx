import PageError from "@/components/shared/PageError/PageError";
import PageSpinner from "@/components/shared/PageSpinner/PageSpinner";
import useFetchSingleListing from "@/hooks/useFetchSingleListing/useFetchSingleListing";
import { useParams } from "react-router-dom";
import ContactListingOwner from "../../../components/listingPage/ContactListingOwner/ContactListingOwner";
import ListingDetails from "../../../components/listingPage/ListingDetails/ListingDetails";
import LocationLeaflet from "../../../components/listingPage/LocationLeaflet/LocationLeaflet";
import ImageCarousel from "@/components/homePage/ImageCarousel/ImageCarousel";
import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";

export default function Listing() {
  useDocumentTitle("listing");
  const { listingId } = useParams();
  const { user } = useContext(AuthContext);

  const { listingData, loading, error } = useFetchSingleListing(listingId);

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <ScrollToTop>
      <main className="pb-6 space-y-6">
        {/* Pictures slider */}
        <div className="">
          <ImageCarousel slideDataArray={listingData.imageUrls} hero={false} />
        </div>
        {/* Listing details */}
        <div className="space-y-4 max-w-2xl px-2">
          <ListingDetails listingData={listingData} />
        </div>
        {/* Listing Location */}
        <div className="space-y-4 px-2">
          <h2 className="text-2xl font-bold">Location</h2>
          {/* Maps */}
          <LocationLeaflet
            position={Object.values(listingData.geolocation)}
            location={listingData.location}
          />
        </div>
        {/* Contact Landlord */}
        <div className={`empty:hidden px-2`}>
          {user?.id !== listingData.userRef ? (
            <ContactListingOwner
              name={listingData.name}
              listingOwnerId={listingData.userRef}
            />
          ) : (
            ""
          )}
        </div>
      </main>
    </ScrollToTop>
  );
}
