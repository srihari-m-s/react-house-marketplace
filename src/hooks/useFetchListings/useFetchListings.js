import { db } from "@/firbase.config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetchListings(dataKey, param) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        // Get collection ref
        const listingsRef = collection(db, "listings");

        // Create a Query
        const q = query(
          listingsRef,
          where(dataKey, "==", param),
          orderBy("timestamp", "desc"),
          limit(10)
        );

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

        setListings(listingsArray);
      } catch (error) {
        toast.error(`Could not fetch listings for ${param}`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [dataKey, param]);

  return { listings, loading };
}
