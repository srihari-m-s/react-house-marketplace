import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import NameAndLocationInput from "../NameAndLocationInput/NameAndLocationInput";
import TypeInput from "../TypeInput/TypeInput";
import OfferInput from "../OfferInput/OfferInput";
import ParkingAndFurnitureInput from "../ParkingAndFurnitureInput/ParkingAndFurnitureInput";
import BedsAndBathsInput from "../BedsAndBathsInput/BedsAndBathsInput";
import ImagesInput from "../ImagesInput/ImagesInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GeolocationInput from "../GeolocationInput/GeolocationInput";

const createListingSchema = z.object({
  name: z.string().min(1, {
    message: "Required",
  }),
  location: z.string().min(1, {
    message: "Required",
  }),
  type: z.string(),
  offer: z.boolean(),
  regularPrice: z.number(),
  discountedPrice: z.number(),
  parking: z.boolean(),
  furnitured: z.boolean(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrls: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
      })
    )
    .refine((data) => data.length <= 6, {
      message: "You can upload up to 6 images.",
    })
    .refine((data) => data.every((file) => file.type.startsWith("image/")), {
      message: "All files must be images.",
    }),
});

export default function CreateListingForm() {
  const form = useForm({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      name: "",
      location: "",
      type: "rent",
      offer: false,
      regularPrice: 0,
      discountedPrice: 0,
      parking: false,
      furnitured: false,
      bedrooms: 1,
      bathrooms: 1,
      latitude: 0,
      longitude: 0,
      imageUrls: [],
    },
  });
  //   local states
  const [useGeocoding, setUseGeocoding] = useState(true);

  async function handleCreateListing(values) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateListing)}
        className="space-y-6"
        noValidate
      >
        {/* Name and Location */}
        <NameAndLocationInput form={form} />

        {/* Type */}
        <TypeInput form={form} />

        {/* Offer and Price */}
        <OfferInput form={form} />

        {/* Parking and Furniture */}
        <ParkingAndFurnitureInput form={form} />

        {/* Beds and Baths */}
        <BedsAndBathsInput form={form} />

        {/* Geolocation */}
        <GeolocationInput
          form={form}
          setUseGeocoding={setUseGeocoding}
          useGeocoding={useGeocoding}
        />

        {/* Image Uploads */}
        <ImagesInput form={form} />

        {/* Submit */}
        <div className="">
          <Button type="submit" size="lg" className="text-base">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
