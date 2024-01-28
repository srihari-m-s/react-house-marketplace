import ImageCarousel from "@/components/homePage/ImageCarousel/ImageCarousel";
import PropertyCard from "@/components/shared/PropertyCard/PropertyCard";

export default function Explore() {
  return (
    <div>
      <div className="2xl:w-10/12 space-y-4 mx-auto">
        <ImageCarousel />
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-2xl text-primary font-semibold">
          Latest Properties
        </h2>

        <div className="">
          <div className="inline-flex flex-wrap gap-5 pb-2">
            {Array.from({ length: 5 }).map((_, index) => {
              return <PropertyCard key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
