import EditListingForm from "@/components/editListingPage/EditListingForm/EditListingForm";
import Spinner from "@/components/shared/Spinner/Spinner";
import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import useFetchSingleListing from "@/hooks/useFetchSingleListing/useFetchSingleListing";
import { useParams } from "react-router-dom";

export default function EditListing() {
  useDocumentTitle("Edit Listing");
  const { listingId } = useParams();
  const { listingData, loading, error } = useFetchSingleListing(listingId);

  return (
    <div className="createListing-form py-6 px-2">
      <h1 className="text-3xl">Edit Listing</h1>
      <hr className="mb-6 mt-2" />

      {/* Create Listing form */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="">
            Something went wrong with fetching listing details.
          </p>
        ) : (
          <EditListingForm listingData={listingData} listingId={listingId} />
        )}
      </div>
    </div>
  );
}
