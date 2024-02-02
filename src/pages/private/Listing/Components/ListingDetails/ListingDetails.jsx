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

      <div className="flex items-center gap-4 empty:hidden  ">
        {/* Furnitured */}
        {listingData.furnitured ? (
          <Badge
            className={
              "px-4 py-2 rounded-full text-base font-medium capitalize"
            }
            variant={"warning"}
          >
            {"Furnitured"}
          </Badge>
        ) : (
          ""
        )}
        {/* Parking */}
        {listingData.parking ? (
          <Badge
            className={
              "px-4 py-2 rounded-full text-base font-medium capitalize"
            }
            variant={"warning"}
          >
            {"Parking Spot"}
          </Badge>
        ) : (
          ""
        )}
      </div>

      {/* Beds and Baths */}
      <div className="flex items-center gap-4 text-lg">
        <span className="flex items-center">
          <IoBed className="inline mr-2" />{" "}
          {listingData.bedrooms > 1
            ? `${listingData.bedrooms} Bedrooms`
            : "1 Bedroom"}
        </span>
        <span className="flex items-center">
          <FaBath className="inline mr-2" />{" "}
          {listingData.bathrooms > 1
            ? `${listingData.bathrooms} Bathrooms`
            : "1 Bathroom"}
        </span>
      </div>
    </>
  );
}
