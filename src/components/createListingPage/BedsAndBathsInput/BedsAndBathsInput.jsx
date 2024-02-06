import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BedsAndBathsInput({ form }) {
  return (
    <div className="space-y-6">
      {/* Bedrooms */}
      <FormField
        control={form.control}
        name="bedrooms"
        render={({ field }) => (
          <FormItem className="formItem">
            <FormLabel className="">Bedrooms</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={1} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bathrooms */}
      <FormField
        control={form.control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem className="formItem">
            <FormLabel className="">Bathrooms</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={1} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
