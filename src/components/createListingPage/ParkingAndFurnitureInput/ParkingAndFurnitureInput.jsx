import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ParkingAndFurnitureInput({ form }) {
  return (
    <div className="space-y-6">
      {/* Parking */}
      <FormField
        control={form.control}
        name="parking"
        render={({ field }) => (
          <FormItem className="formItem flex items-center gap-4">
            <FormLabel className="">Parking</FormLabel>
            <FormControl>
              <input
                type="checkbox"
                name="parking"
                className="custom-checkbox"
                defaultChecked={field.value}
                onClick={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Furniture */}
      <FormField
        control={form.control}
        name="furnitured"
        render={({ field }) => (
          <FormItem className="formItem flex items-center gap-4">
            <FormLabel className="">Furnitured</FormLabel>
            <FormControl>
              <input
                type="checkbox"
                name="furnitured"
                className="custom-checkbox"
                defaultChecked={field.value}
                onClick={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
