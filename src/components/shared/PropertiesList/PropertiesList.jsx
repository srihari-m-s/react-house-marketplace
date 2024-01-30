import PropertyCard from "../PropertyCard/PropertyCard";

export default function PropertiesList({ listings }) {
  return (
    <>
      {listings.length ? (
        listings.map((_, index) => {
          return <PropertyCard key={index} />;
        })
      ) : (
        <p>No properties in this category</p>
      )}
    </>
  );
}
