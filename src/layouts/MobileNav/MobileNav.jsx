import { NavLink } from "react-router-dom";
import { FaHouse, FaUser } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";

const MOBILE_NAVLINKS = [
  {
    label: "Home",
    link: "/",
    icon: <FaHouse />,
  },
  {
    label: "Offers",
    link: "/offers",
    icon: <BiSolidOffer />,
  },
  {
    label: "Profile",
    link: "/profile",
    icon: <FaUser />,
  },
];

export default function MobileNav() {
  return (
    <nav className="flex items-center justify-center py-2 sticky bottom-0 left-0 right-0 bg-white border-t shadow-[0_-5px_5px_-5px_rgba(0,0,0,0.3)] lg:hidden">
      <div className="flex items-center gap-2">
        {MOBILE_NAVLINKS.map(({ label, link, icon }, index) => {
          return (
            <NavLink
              to={link}
              key={`${label}-${index}`}
              className={({ isActive }) => {
                return `grid place-items-center gap-2 text-base py-1 px-4 hover:bg-sky-700 hover:text-white ${
                  isActive ? "text-sky-700" : ""
                }`;
              }}
              // className={
              //   "text-lg py-1 px-4 rounded-md hover:bg-sky-700 hover:text-white "
              // }
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
