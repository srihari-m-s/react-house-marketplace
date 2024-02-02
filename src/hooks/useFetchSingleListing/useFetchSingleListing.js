import { db } from "@/firbase.config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchSingleListing(listingId) {
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      try {
        const docRef = doc(db, "listings", listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListingData(docSnap.data());
        }
      } catch (error) {
        setError(
          "Something went wrong when fetching Listing. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [listingId]);

  return { listingData, loading, error };
}
