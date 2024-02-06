import PropertiesList from "@/components/shared/PropertiesList/PropertiesList";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";

import Spinner from "@/components/shared/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import useFetchListings from "@/hooks/useFetchListings/useFetchListings";
import { useParams } from "react-router-dom";

export default function Categories() {
  const { categoryName } = useParams();

  useDocumentTitle(categoryName);

  const { listings, loading, lastFetchedListing, handleFetchNextListings } =
    useFetchListings("type", categoryName);

  // Handle Load more click
  function handleLoadMoreClick() {
    handleFetchNextListings();
  }

  return (
    <ScrollToTop>
      <div className="py-6 space-y-6 px-2">
        {/* Heading */}
        <h1 className="text-3xl font-bold capitalize ">{categoryName}</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="inline-flex flex-wrap gap-4">
            <PropertiesList listings={listings} categoryName={categoryName} />
          </div>
        )}
        {lastFetchedListing ? (
          <div className="text-center">
            <Button className="text-base" onClick={handleLoadMoreClick}>
              Load More
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </ScrollToTop>
  );
}
