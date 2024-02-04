import { db } from "@/firbase.config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetchListings(dataKey, param, itemLimit = 10) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

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
          limit(itemLimit)
        );

        // Execute Query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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
  }, [dataKey, param, itemLimit]);

  // Handle fetchNextListings
  async function handleFetchNextListings() {
    try {
      // Get collection ref
      const listingsRef = collection(db, "listings");

      // Create a Query
      const qNext = query(
        listingsRef,
        where(dataKey, "==", param),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(itemLimit)
      );

      // Execute Query
      const querySnap = await getDocs(qNext);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listingsArray = [];

      // Does not work with for loop. No idea why
      querySnap.forEach((doc) => {
        return listingsArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prev) => [...prev, ...listingsArray]);
    } catch (error) {
      toast.error(`Could not fetch next listings`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { listings, loading, lastFetchedListing, handleFetchNextListings };
}
