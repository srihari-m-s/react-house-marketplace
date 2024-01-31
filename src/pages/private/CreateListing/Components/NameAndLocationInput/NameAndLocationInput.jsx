import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
              <Textarea
                placeholder="Address"
                className="resize-none text-base"
                {...field}
                required
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
