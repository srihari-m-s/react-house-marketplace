export default function ParkingAndFurnitureInput({ form }) {
  return (
    <div className="space-y-6">
      {/* Parking */}
      <div className="flex items-center gap-4">
        <label htmlFor="parking" className="cursor-pointer">
          Parking
        </label>
        <input
          type="checkbox"
          name="parking"
          id="parking"
          className="custom-checkbox"
          {...form.register("parking")}
        />
      </div>
      {/* Furniture */}
      <div className="flex items-center gap-4">
        <label htmlFor="furnitured" className="cursor-pointer">
          Furnitured
        </label>
        <input
          type="checkbox"
          name="furnitured"
          id="furnitured"
          className="custom-checkbox"
          {...form.register("furnitured")}
        />
      </div>
    </div>
  );
}
