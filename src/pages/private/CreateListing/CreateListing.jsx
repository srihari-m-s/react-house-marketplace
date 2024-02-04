import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import CreateListingForm from "./Components/CreateListingForm/CreateListingForm";
import "./CreateListing.css";

export default function CreateListing() {
  useDocumentTitle("Create Listing");

  return (
    <div className="createListing-form py-6 px-2">
      <h1 className="text-3xl">Create your Listing</h1>
      <hr className="mb-6 mt-2" />

      {/* Create Listing form */}
      <div className="max-w-2xl mx-auto">
        <CreateListingForm />
      </div>
    </div>
  );
}
