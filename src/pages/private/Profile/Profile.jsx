import NameForm from "@/components/profilePage/NameForm/NameForm";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import UsersListings from "@/components/profilePage/UsersListings/UsersListings";
import useDocumentTitle from "@/hooks/useDocumentTitle/useDocumentTitle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";

export default function Profile() {
  useDocumentTitle("profile");

  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Local states

  function handleLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="py-8 space-y-6 px-2">
      {/* Heading */}
      <div className="">
        <h1 className="text-3xl">Profile</h1>
        <hr />
      </div>

      {/* Edit Displayname form */}
      <div className="w-[30ch] my-6 space-y-6 mx-auto">
        <NameForm />

        {/* Create Listing */}
        <div className="">
          <Link to={"/create-listing"} className="">
            <Button className="w-full text-lg" variant="warning">
              Create Your Listing
            </Button>
          </Link>
        </div>

        {/* Logout */}
        <Button
          type="button"
          onClick={handleLogout}
          className="w-full text-lg"
          size="lg"
        >
          <LuLogOut className="inline mr-2 w-4 h-4" /> Logout
        </Button>
      </div>

      {/* LoggedIn User's listing */}
      {Object.keys(user).length ? <UsersListings user={user} /> : ""}
    </div>
  );
}
