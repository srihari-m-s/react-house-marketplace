import PropertyCard from "../PropertyCard/PropertyCard";

export default function PropertiesList({ listings, categoryName }) {
  return (
    <>
      {listings.length ? (
        listings.map((listing) => {
          return (
            <PropertyCard
              key={listing.id}
              categoryName={categoryName}
              listingData={listing.data}
              listingId={listing.id}
            />
          );
        })
      ) : (
        <p>No properties in this category</p>
      )}
    </>
  );
}
