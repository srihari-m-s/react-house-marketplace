import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import { FaCircleUser, FaHouseFlag } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const NAVINKS = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Offers",
    link: "/offers",
  },
  {
    label: "Profile",
    link: "/profile",
  },
];

export default function Navbar() {
  const { user, loggedIn } = useAuthStatus();

  return (
    <div className="bg-gradient-to-b from-secondary/20 to-secondary border-b backdrop-blur supports-backdrop-blur:bg-white/95 sticky top-0 z-40">
      <nav
        className="mx-auto 2xl:max-w-[80dvw] flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        {/* Brand */}
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-end gap-2">
            <span className="sr-only">Your Company</span>
            <FaHouseFlag className="text-3xl text-sky-900" />
            <p className="text-xl">House Marketplace</p>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            // onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MdMenu />
          </button>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-2">
          {NAVINKS.map(({ label, link }, index) => {
            return (
              <NavLink
                to={link}
                key={`${label}-${index}`}
                className={({ isActive }) => {
                  return `text-lg py-1 px-4 rounded-md hover:bg-sky-700 hover:text-white ${
                    isActive ? "bg-sky-700/60 text-white" : ""
                  }`;
                }}
                // className={
                //   "text-lg py-1 px-4 rounded-md hover:bg-sky-700 hover:text-white "
                // }
              >
                {label}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to={loggedIn ? "/profile" : "/login"}
            className="text-lg font-semibold leading-6 text-gray-900 py-2 px-4 rounded-full hover:bg-sky-700 hover:text-white flex items-center"
          >
            <FaCircleUser className="text-3xl inline mr-2" />{" "}
            {loggedIn ? user.displayName : "Log in"}
          </Link>
        </div>
      </nav>
    </div>
  );
}
