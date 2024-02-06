import { db } from "@/firbase.config";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchShortlisted(listingIds) {
  const [loading, setLoading] = useState(true);
  const [shortlistedListings, setShortlistedListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShortlistedListings() {
      try {
        // Get collection ref
        const listingsRef = collection(db, "listings");

        // Create a Query
        const q = query(listingsRef, where(documentId(), "in", listingIds));

        // Execute Query
        const querySnap = await getDocs(q);

        const listingsArray = [];

        // Does not work with for loop. No idea why
        querySnap.forEach((doc) => {
          return listingsArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setShortlistedListings(listingsArray);
      } catch (error) {
        setError(`Could not fetch your listings`);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchShortlistedListings();
  }, [listingIds]);

  return { loading, error, shortlistedListings };
}
