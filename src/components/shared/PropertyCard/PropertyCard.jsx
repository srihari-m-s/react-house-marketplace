import { DummyHome } from "@/assets/dummy";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FaHouseChimney, FaLocationDot, FaBath } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { IoBed } from "react-icons/io5";
// import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import DeleteListing from "./DeleteListing";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import Shortlist from "./Shortlist";

export default function PropertyCard({
  categoryName,
  listingData,
  listingId,
  handleDelete,
}) {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <Card className="w-72 sm:w-[315px] bg-accent/60 property-card">
      <CardContent className="p-4">
        <div className="grid gap-4">
          <Link to={`/category/${categoryName}/${listingId}`}>
            <div className="mx-auto rounded-xl overflow-hidden">
              <img
                src={listingData.imageUrls[0] || DummyHome}
                alt={listingData.name}
                className="w-full aspect-square object-cover rounded-xl shadow-lg border duration-500 hover:scale-110"
              />
            </div>
          </Link>

          <div className="space-y-4">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaHouseChimney className="inline text-xl mr-2" />
                House
              </span>

              <Shortlist />
            </div>

            {/* Price and Address */}
            <Link to={`/category/${categoryName}/${listingId}`}>
              <div className="grid">
                <p className="text-xl font-bold text-amber-700">
                  {listingData.name}
                </p>
                <p className="text-xl text-blue-800 font-bold">
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
                </p>
                <p className="truncate">{listingData.location}</p>
              </div>
            </Link>

            {/* Bed and Baths */}
            <div className="grid grid-cols-2">
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

            {/* Location */}
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaLocationDot className="mr-1" />
                Location
              </span>

              {/* <Badge variant={"warning"} className={"rounded-full"}>
                Featured
              </Badge> */}
            </div>

            {/* Show Edit if listin belongs to LoggedInUser */}
            <div className="grid grid-cols-2">
              {user?.uid === listingData.userRef && pathname === "/profile" ? (
                <>
                  <Link to={`/edit-listing/${listingId}`}>
                    <Button className="text-base w-full" variant="info">
                      Edit
                    </Button>
                  </Link>
                </>
              ) : (
                ""
              )}
              {/* Show Delete if listing belongs LoggedIn user */}
              {user?.uid === listingData.userRef && handleDelete ? (
                <DeleteListing
                  listingData={listingData}
                  listingId={listingId}
                  handleDelete={handleDelete}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
