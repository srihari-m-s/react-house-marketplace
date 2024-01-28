import NameForm from "@/components/profilePage/NameForm/NameForm";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  // Local states

  function handleLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="py-8">
      {/* Heading */}
      <div className="">
        <h1 className="text-3xl">Profile</h1>
      </div>
      <hr />

      {/* Edit Displayname form */}
      <div className="w-[30ch] my-6 space-y-6">
        <NameForm />
        {/* Logout */}
        <Button type="button" onClick={handleLogout} className="w-full">
          <LuLogOut className="inline mr-2 w-4 h-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
