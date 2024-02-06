import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
// import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import MobileNav from "../MobileNav/MobileNav";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import PageSpinner from "@/components/shared/PageSpinner/PageSpinner";

export default function RootLayout() {
  const { loggedIn, checkingStatus } = useContext(AuthContext);

  if (checkingStatus) {
    return <PageSpinner />;
  }

  if (!loggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-0 overflow-hidden lg:px-8 pb-8 min-h-[calc(100dvh-70px-289px)]">
        <Outlet />
      </main>
      <div className="">
        <Footer />
      </div>
      <MobileNav />
    </>
  );
}
