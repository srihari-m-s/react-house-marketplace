import PropertiesList from "@/components/shared/PropertiesList/PropertiesList";

import Spinner from "@/components/shared/Spinner/Spinner";
import useFetchListings from "@/hooks/useFetchListings/useFetchListings";
import { useParams } from "react-router-dom";

export default function Categories() {
  const { categoryName } = useParams();
  const { listings, loading } = useFetchListings(categoryName);

  return (
    <div className="py-6 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold capitalize ">{categoryName}</h1>

      <div className="inline-flex flex-wrap gap-4">
        {loading ? (
          <Spinner />
        ) : (
          <PropertiesList listings={listings} categoryName={categoryName} />
        )}
      </div>
    </div>
  );
}
