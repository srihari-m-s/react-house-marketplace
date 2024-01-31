import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./CreateListing.css";
import TypeInput from "./Components/TypeInput/TypeInput";
import OfferInput from "./Components/OfferInput/OfferInput";
import { Button } from "@/components/ui/button";
import ParkingAndFurnitureInput from "./Components/ParkingAndFurnitureInput/ParkingAndFurnitureInput";
import BedsAndBathsInput from "./Components/BedsAndBathsInput/BedsAndBathsInput";

const createListingSchema = z.object({});

export default function CreateListing() {
  const form = useForm({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleCreateListing(values) {
    console.log(values);
  }

  return (
    <div className="createListing-form py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateListing)}
          className="space-y-6"
          noValidate
        >
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
                  <Input
                    placeholder="Location"
                    className=""
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <TypeInput form={form} />

          {/* Offer and Price */}
          <OfferInput form={form} />

          {/* Parking and Furniture */}
          <ParkingAndFurnitureInput form={form} />

          {/* Beds and Baths */}
          <BedsAndBathsInput form={form} />

          {/* Submit */}
          <div className="">
            <Button type="submit" size="lg" className="text-base">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
