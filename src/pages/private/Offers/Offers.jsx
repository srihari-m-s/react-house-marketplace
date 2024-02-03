import PropertiesList from "@/components/shared/PropertiesList/PropertiesList";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import useFetchListings from "@/hooks/useFetchListings/useFetchListings";

export default function Offers() {
  const { listings, loading, lastFetchedListing, handleFetchNextListings } =
    useFetchListings("offer", true);

  // Handle Load more click
  function handleLoadMoreClick() {
    handleFetchNextListings();
  }

  return (
    <div className="py-6 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold capitalize ">{"Offers"}</h1>

      <div className="inline-flex flex-wrap gap-4">
        {loading ? (
          <Spinner />
        ) : (
          <PropertiesList listings={listings} categoryName={"Offers"} />
        )}
      </div>

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
  );
}
