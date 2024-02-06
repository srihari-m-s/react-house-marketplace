import { useContext, useState } from "react";
import IconHeart from "../svgIcons/IconHeart";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firbase.config";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

export default function Shortlist({ listingId }) {
  const { user } = useContext(AuthContext);

  //   Local States
  const [shortlisted, setShortlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Add to short list click
  async function handleAddToShortlist() {
    setShortlisted((prev) => !prev);
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        shortlisted: arrayUnion(listingId),
      });
    } catch (error) {
      toast.error("Error Adding to shortlist. Please try again.");
      setShortlisted((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  // Handle Remove from short list click
  async function handleRemoveFromShortlist() {
    setShortlisted((prev) => !prev);
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        shortlisted: arrayRemove(listingId),
      });
    } catch (error) {
      toast.error("Error Removing from shortlist. Please try again.");
      setShortlisted((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {shortlisted ? (
        <button
          className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center bg-white"
          onClick={handleAddToShortlist}
          disabled={loading}
        >
          <IconHeart className={`text-xl text-red-600`} />
        </button>
      ) : (
        <button
          className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center bg-white"
          onClick={handleRemoveFromShortlist}
          disabled={loading}
        >
          <IconHeart className={`text-xl text-white`} />
        </button>
      )}
    </div>
  );
}
