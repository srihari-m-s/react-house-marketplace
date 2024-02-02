import { db } from "@/firbase.config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchSlides(itemLimit) {
  const [slideListings, setSlideListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        // Get collection ref
        const listingsRef = collection(db, "listings");

        // Create a Query
        const q = query(
          listingsRef,
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
            type: doc.data().type,
            imageUrl: doc.data().imageUrls[0],
            address: doc.data().location,
            price: doc.data().offer
              ? doc.data().discountedPrice
              : doc.data().regularPrice,
          });
        });

        setSlideListings(listingsArray);
      } catch (error) {
        setError(`Could not fetch Slide listings`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [itemLimit]);

  return { slideListings, loading, error };
}

useFetchSlides.defaultProps = {
  itemLimit: 5,
};
