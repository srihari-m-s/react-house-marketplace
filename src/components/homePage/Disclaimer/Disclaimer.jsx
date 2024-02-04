import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Disclaimer() {
  const [seenDisclaimer, setSeenDisclaimer] = useState(
    sessionStorage.getItem("seenDisclaimer") === "true"
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("seenDisclaimer") === "true";
    if (!seen) {
      setOpen(true);
    }
  }, []);

  function handleUnderstand() {
    setSeenDisclaimer(true);
    setOpen(false);
    sessionStorage.setItem("seenDisclaimer", "true");
  }

  return !seenDisclaimer ? (
    <AlertDialog open={open} onOpenChange={handleUnderstand}>
      <AlertDialogOverlay className="bg-white bg-opacity-0 backdrop-blur supports-backdrop-blur:bg-white/95 " />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-warning md:text-3xl">
            Disclaimer!
          </AlertDialogTitle>
          <AlertDialogDescription className="md:text-base">
            This website is intended as proof of experience and knowledge. All
            location, pictures, and property data being displayed are not owned
            by me. Any resemblance to the original location, property, or any
            other details is purely coincidental and does not represent a
            legitimate business.
          </AlertDialogDescription>

          <AlertDialogDescription className="font-bold md:text-base">
            Note -
          </AlertDialogDescription>

          <ul className="list-disc px-4">
            <li>
              <AlertDialogDescription className="md:text-base">
                Google Sign up and Login is functional on the website. If you
                want to test its functionality, please use a dummy/tertiary
                account.{" "}
                <span className="font-bold text-blue-800">
                  I encourage you to use dummy email/password
                </span>{" "}
                to check fuctionality of account creation.
              </AlertDialogDescription>
            </li>
            <li>
              <AlertDialogDescription className="md:text-base">
                <span className="font-bold text-blue-800">Test accounts</span>{" "}
                have been setup to test the website.
              </AlertDialogDescription>
            </li>
          </ul>

          <AlertDialogDescription className="md:text-base">
            Thank you for checking out this project!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-base">
            I understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    ""
  );
}
