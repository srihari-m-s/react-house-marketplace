import { Button } from "@/components/ui/button";
import { db } from "@/firbase.config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ContactListingOwner({ listingOwnerId, name }) {
  // local states
  const [listingOwner, setListingOwner] = useState({});

  useEffect(() => {
    async function fetchListingOwner() {
      const docRef = doc(db, "users", listingOwnerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListingOwner(docSnap.data());
      } else {
        toast.error("Unable to fetch Listing Owner Contact");
      }
    }

    if (listingOwnerId) {
      fetchListingOwner();
    }
  }, [listingOwnerId]);

  return (
    <a
      href={`mailto:${listingOwner.email}?Subject=${name}`}
      className={`${
        Object.keys(listingOwner).length ? "" : "pointer-events-none"
      }`}
    >
      <Button
        type="button"
        size="lg"
        className="text-base"
        disabled={Object.keys(listingOwner).length ? false : true}
      >
        Contact Landlord
      </Button>
    </a>
  );
}
