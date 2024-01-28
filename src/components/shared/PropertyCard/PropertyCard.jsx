import { DummyHome } from "@/assets/dummy";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FaHouseChimney, FaLocationDot, FaRegHeart } from "react-icons/fa6";

export default function PropertyCard() {
  return (
    <Card className="w-72 sm:w-[315px] bg-accent/60">
      <CardContent className="p-4">
        <div className="grid gap-4">
          <div className="mx-auto">
            <img
              src={DummyHome}
              alt="Home"
              className="w-full aspect-square object-cover rounded-xl shadow-lg border"
            />
          </div>

          <div className="space-y-4">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaHouseChimney className="inline text-xl mr-2" />
                House
              </span>

              <button className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center bg-white">
                <FaRegHeart className="text-xl" />
              </button>
            </div>

            {/* Price and Address */}
            <div className="grid">
              <p className="text-xl text-blue-800 font-bold">$ 500,356</p>
              <p className="truncate">
                Address Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Quae, earum?
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaLocationDot />
                Location
              </span>

              <Badge variant={"warning"} className={"rounded-full"}>
                Featured
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
