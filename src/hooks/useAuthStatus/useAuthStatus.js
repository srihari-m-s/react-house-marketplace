import { db } from "@/firbase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [user, setUser] = useState({});
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);

          // Get user data
          const userDocRef = doc(db, "users", user.uid);
          getDoc(userDocRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                setUser({ id: user.uid, ...docSnap.data() });
              } else {
                setUser({});
              }
            })
            .catch(() => setUser({}));
        } else {
          setLoggedIn(false);
          setUser({});
        }
        setCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  async function fetchUserData(userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUser({ id: userId, ...docSnap.data() });
      } else {
        setUser({});
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  }

  return { loggedIn, checkingStatus, user, fetchUserData };
}
