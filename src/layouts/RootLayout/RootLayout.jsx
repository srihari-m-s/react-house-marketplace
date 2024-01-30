import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import Spinner from "@/components/shared/Spinner/Spinner";

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
      <main className="container mx-auto pb-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
