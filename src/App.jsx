import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home/Home";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";

// Private Routes
import RootLayout from "./layouts/RootLayout/RootLayout";
import Rents from "./pages/private/Rents/Rents";
import Offers from "./pages/private/Offers/Offers";
import Listing from "./pages/private/Listing/Listing";
import Profile from "./pages/private/Profile/Profile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route path="rents" element={<Rents />} />
          <Route path="offers" element={<Offers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="listing/:address" element={<Listing />} />
        </Route>
      </Routes>

      {/* Toaster */}
      <Toaster />
    </Router>
  );
}

export default App;
