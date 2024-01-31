import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OfferInput({ form }) {
  const [isOffer, setIsOffer] = useState(false);

  function handleOfferClick(e) {
    setIsOffer(e.target.checked);
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="Offer"
        render={({ field }) => (
          <FormItem className="formItem flex items-center gap-4">
            <FormLabel className="">Offer</FormLabel>
            <FormControl>
              <input
                type="checkbox"
                name="offer"
                className="custom-checkbox"
                defaultChecked={field.value}
                onClick={(e) => {
                  handleOfferClick(e);
                  field.onChange;
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Prices */}
      <div className="flex flex-col gap-4">
        {/* Regular Price */}
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel className="">
                Regular Price{" "}
                {form.getValues().type === "rent" ? (
                  <small className="text-gray-500">/ month</small>
                ) : (
                  ""
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Regular Price"
                  type="number"
                  className=""
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discounted Price */}
        <FormField
          control={form.control}
          name="discountedPrice"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel className="">Discounted Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Discounted Price"
                  type="number"
                  className=""
                  {...field}
                  disabled={!isOffer}
                  required={isOffer}
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
