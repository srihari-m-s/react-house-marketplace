import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home/Home";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";

// Private Routes
import RootLayout from "./layouts/RootLayout/RootLayout";
import Offers from "./pages/private/Offers/Offers";
import Listing from "./pages/private/Listing/Listing";
import Profile from "./pages/private/Profile/Profile";
import Categories from "./pages/private/Categories/Categories";
import CreateListing from "./pages/private/CreateListing/CreateListing";
import EditListing from "./pages/private/EditListing/EditListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route path="offers" element={<Offers />} />
          <Route path="category/:categoryName" element={<Categories />} />
          <Route
            path="category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="create-listing" element={<CreateListing />} />
          <Route path="edit-listing/:listingId" element={<EditListing />} />
        </Route>
      </Routes>

      {/* Toaster */}
      <Toaster />
    </Router>
  );
}

export default App;
