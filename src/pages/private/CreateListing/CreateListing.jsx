import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import CreateListingForm from "@/components/createListingPage/CreateListingForm/CreateListingForm";
import "./CreateListing.css";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";

export default function CreateListing() {
  useDocumentTitle("Create Listing");

  return (
    <ScrollToTop>
      <div className="createListing-form py-6 px-2">
        <h1 className="text-3xl">Create your Listing</h1>
        <hr className="mb-6 mt-2" />
        {/* Create Listing form */}
        <div className="max-w-2xl mx-auto">
          <CreateListingForm />
        </div>
      </div>
    </ScrollToTop>
  );
}
