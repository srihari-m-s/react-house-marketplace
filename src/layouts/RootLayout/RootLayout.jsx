import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function RootLayout() {
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
