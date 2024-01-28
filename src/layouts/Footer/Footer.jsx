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
          <div className="grid grid-cols-3 place-items-center text-accent">
            <div className="text-left">
              <h4 className="font-bold text-lg">Lorem, ipsum.</h4>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                rerum incidunt accusamus ipsam optio velit? Aliquam sint aperiam
                suscipit ipsa.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg">Lorem, ipsum.</h4>
              <p className="">lorem</p>
              <p className="">lorem</p>
              <p className="">lorem</p>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg">Lorem, ipsum.</h4>
              <p className="">lorem</p>
              <p className="">lorem</p>
              <p className="">lorem</p>
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
