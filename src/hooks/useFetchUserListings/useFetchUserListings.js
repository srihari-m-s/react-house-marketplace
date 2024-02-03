import { db } from "@/firbase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetchUserListings(userId, itemLimit) {
  const [loading, setLoading] = useState(true);
  const [userListings, setUserListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        // Get collection ref
        const listingsRef = collection(db, "listings");

        // Create a Query
        const q = query(
          listingsRef,
          where("userRef", "==", userId),
          orderBy("timestamp", "desc"),
          limit(itemLimit)
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

        setUserListings(listingsArray);
      } catch (error) {
        setError(`Could not fetch your listings`);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [userId, itemLimit]);

  // Handle Delete
  async function handleDelete(listingId) {
    await deleteDoc(doc(db, "listings", listingId));
    setUserListings((prev) =>
      prev.filter((listing) => listing.id !== listingId)
    );
    toast.success("Listing Deleted.");
  }

  return { userListings, loading, error, handleDelete };
}

useFetchUserListings.defaultProps = {
  itemLimit: 10,
};
