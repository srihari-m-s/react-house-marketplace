import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  let footerDate = new Date().getFullYear();

  return (
    <footer className="bg-stone-600 py-10 text-center">
      <div className="container mx-auto">
        <div className="space-y-4">
          {/* Socials */}
          <span className="flex gap-8 items-center text-primary">
            <span className="w-12 h-12 rounded-full grid place-items-center hover:bg-primary hover:text-sky-800">
              <FaFacebookF className="text-3xl" />
            </span>
            <span className="w-12 h-12 rounded-full grid place-items-center hover:bg-primary hover:text-sky-800">
              <FaXTwitter className="text-3xl" />
            </span>
            <span className="w-12 h-12 rounded-full grid place-items-center hover:bg-primary hover:text-sky-800">
              <FaYoutube className="text-3xl" />
            </span>
            <span className="w-12 h-12 rounded-full grid place-items-center hover:bg-primary hover:text-sky-800">
              <FaInstagram className="text-3xl" />
            </span>
          </span>

          {/* Policies */}
          <div className="grid grid-cols-3 gap-4 place-items-center text-accent">
            <div className="text-left col-span-3 md:col-span-1 ">
              <h4 className="font-bold text-lg">House Marketplace</h4>
              <p className="">
                Look no further to rent out or sell your property, for we have
                the best platform and people to help you to your goals.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg">Our Services</h4>
              <p className="">Post your Property</p>
              <p className="">Real Estate Investments</p>
              <p className="">Customer Service</p>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg">Company</h4>
              <p className="">Contact Us</p>
              <p className="">Feedback</p>
              <p className="">Privacy Policy</p>
            </div>
          </div>
          <h3 className="text-lg text-accent">
            &copy; Copyrighted {footerDate}. All Rights Reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
}
