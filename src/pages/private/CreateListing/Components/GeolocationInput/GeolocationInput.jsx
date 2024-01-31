import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function GeolocationInput({
  form,
  setUseGeocoding,
  useGeocoding,
}) {
  function handleClick(e) {
    setUseGeocoding(e.target.checked);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="geocoding">Use Geocoding for location?</label>
        <input
          type="checkbox"
          name="offer"
          className="custom-checkbox"
          defaultChecked={useGeocoding}
          onClick={handleClick}
        />
      </div>

      {/* lat and lng */}
      <div className="flex flex-col gap-4">
        {/* Latitude */}
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel className="">Latitude</FormLabel>
              <FormControl>
                <Input
                  placeholder="Latitude"
                  type="number"
                  className=""
                  {...field}
                  disabled={useGeocoding}
                  required={!useGeocoding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Longitude */}
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel className="">Longitude</FormLabel>
              <FormControl>
                <Input
                  placeholder="Longitude"
                  type="number"
                  className=""
                  {...field}
                  disabled={useGeocoding}
                  required={!useGeocoding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
