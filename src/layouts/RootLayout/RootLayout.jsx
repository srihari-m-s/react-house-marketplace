import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import Spinner from "@/components/shared/Spinner/Spinner";
import MobileNav from "../MobileNav/MobileNav";

export default function RootLayout() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (!loggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-2 md:px-8 pb-8 min-h-[calc(100dvh-70px-289px)]">
        <Outlet />
      </main>
      <div className="">
        <Footer />
      </div>
      <MobileNav />
    </>
  );
}
