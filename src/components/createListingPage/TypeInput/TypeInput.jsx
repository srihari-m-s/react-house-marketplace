import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

export default function TypeInput({ form }) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="formItem">
          <FormLabel className="">Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value || "rent"}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2 custom-radio-input">
                <Label
                  htmlFor="rent"
                  className="border border-input py-2 px-8 rounded cursor-pointer"
                >
                  Rent
                </Label>
                <RadioGroupItem value="rent" id="rent" className="invisible" />
              </div>
              <div className="flex items-center space-x-2 custom-radio-input">
                <Label
                  htmlFor="sale"
                  className="border border-input py-2 px-8 rounded cursor-pointer"
                >
                  Sale
                </Label>
                <RadioGroupItem value="sale" id="sale" className="invisible" />
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
