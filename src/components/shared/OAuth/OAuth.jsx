import { Button } from "@/components/ui/button";
import GoogleIcon from "../../../assets/svg/googleIcon.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firbase.config";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OAuth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function handleGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //   Check for user and if user does not exist create User
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          fullname: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
          shortlisted: [],
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Unable to authorize with Google");
    }
  }

  return (
    <div className="grid place-items-center">
      <Button
        variant="outline"
        size="lg"
        className="py-6 bg-transparent"
        onClick={handleGoogleClick}
      >
        <img src={GoogleIcon} alt="Google" className="h-8 w-8 mr-2" />{" "}
        {pathname === "/login" ? "Login" : "Sign up"} With Google
      </Button>
    </div>
  );
}
