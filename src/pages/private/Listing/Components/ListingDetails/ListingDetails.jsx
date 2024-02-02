import { Badge } from "@/components/ui/badge";
import { FaBath } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";

export default function ListingDetails({ listingData }) {
  return (
    <>
      {/* name */}
      <h2 className="text-2xl font-bold">{listingData.name}</h2>
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

        <span className="flex items-center gap-2 text-lg">
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
            {"Parking"}
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
