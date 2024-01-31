import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function NameAndLocationInput({ form }) {
  return (
    <>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="formItem">
            <FormLabel className="">House Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" className="" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Location */}
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="formItem">
            <FormLabel className="">Location</FormLabel>
            <FormControl>
              <Input placeholder="Location" className="" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
