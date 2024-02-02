import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FaBath, FaShare } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";

export default function ListingDetails({ listingData }) {
  function handleShareClick() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied to Clipboard!");
  }

  return (
    <>
      {/* name */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">{listingData.name}</h2>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full flex items-center justify-center border-0 p-2 hover:text-sky-700"
          onClick={handleShareClick}
        >
          <FaShare className="text-2xl" />
        </Button>
      </div>
      {/* location */}
      <p className="text-lg">{listingData.location}</p>
      {/* type and price */}
      <div className="flex items-center gap-4">
        <Badge
          className={"px-4 py-2 rounded-full text-base font-medium capitalize"}
          variant={"info"}
        >
          For {listingData.type}
        </Badge>

        <span className="flex items-center gap-2 text-lg font-bold">
          {listingData.offer ? (
            <>
              <small className="text-destructive/60 line-through">
                {listingData.regularPrice}{" "}
              </small>
              {listingData.discountedPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </>
          ) : (
            listingData.regularPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          )}
          {listingData.type === "rent" && (
            <small className="text-gray-500"> / Month</small>
          )}
        </span>
      </div>

      <div className="flex items-stretch">
        {/* Furnitured */}
        {listingData.furnitured ? (
          <div className="border p-10 grid place-items-center gap-2 min-w-48">
            <Badge
              className={
                "px-4 py-2 rounded-full text-base font-medium capitalize shadow-lg"
              }
              variant={"warning"}
            >
              {"Furnitured"}
            </Badge>{" "}
          </div>
        ) : (
          ""
        )}
        {/* Parking */}
        {listingData.parking ? (
          <div className="border p-10 grid place-items-center gap-2 min-w-48">
            <Badge
              className={
                "px-4 py-2 rounded-full text-base font-medium capitalize shadow-lg"
              }
              variant={"warning"}
            >
              {"Parking Spot"}
            </Badge>
          </div>
        ) : (
          ""
        )}
        {/* Bedrooms */}
        <div className="border p-10 grid place-items-center gap-2 min-w-48">
          <span className="p-4 bg-accent rounded-full shadow-lg hover:text-sky-700">
            <IoBed className="text-2xl" />
          </span>
          <p>
            {listingData.bedrooms > 1
              ? `${listingData.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </p>
        </div>
        {/* Bathrooms */}
        <div className="border p-10 grid place-items-center gap-2 min-w-48">
          <span className="p-4 bg-accent rounded-full shadow-lg hover:text-sky-700">
            <FaBath className="text-2xl" />
          </span>
          <p>
            {listingData.bathrooms > 1
              ? `${listingData.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </p>
        </div>
      </div>
    </>
  );
}
