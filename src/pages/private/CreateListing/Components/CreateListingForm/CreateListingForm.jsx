import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NameAndLocationInput from "../NameAndLocationInput/NameAndLocationInput";
import TypeInput from "../TypeInput/TypeInput";
import OfferInput from "../OfferInput/OfferInput";
import ParkingAndFurnitureInput from "../ParkingAndFurnitureInput/ParkingAndFurnitureInput";
import BedsAndBathsInput from "../BedsAndBathsInput/BedsAndBathsInput";
import ImagesInput from "../ImagesInput/ImagesInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GeolocationInput from "../GeolocationInput/GeolocationInput";
import toast from "react-hot-toast";
import { storeImage } from "@/helpers/FireStorage";
import UploadFeedback from "@/components/createListingPage/UploadFeedback/UploadFeedback";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firbase.config";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import { createListingSchema } from "@/helpers/FormSchemas";
import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function CreateListingForm() {
  const navigate = useNavigate();
  const { user } = useAuthStatus();
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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  let redirectTimer;

  async function handleCreateListing(values) {
    // set loading
    setLoading(true);

    const {
      discountedPrice,
      regularPrice,
      latitude,
      longitude,
      location,
      offer,
    } = values;
    const formData = { ...values };
    // check if discounted price is > regular price
    if (offer && discountedPrice >= regularPrice) {
      toast.error("Discounted Price must be less than Regular Price");
      return;
    }

    let geolocation = {};

    if (useGeocoding) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${MAPS_KEY}`
      );
      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      let formattedLocation =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (
        formattedLocation === undefined ||
        formattedLocation.includes("undefined")
      ) {
        setLoading(false);
        toast.error("Please enter a Correct Address");
        return;
      }

      // console.log("From geocoding", data);
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    // Store image in firebase
    let imageProgressStep = 0.5 / formData.imageUrls.length;
    const uploadedImageUrls = await Promise.all(
      [...formData.imageUrls].map((image) =>
        storeImage(image, () => setProgress((prev) => prev + imageProgressStep))
      )
    ).catch(() => {
      setLoading(false);
      toast.error("Upload of images failed. Please try again.");
      return;
    });

    // format formData
    // Delete unwanted data
    delete formData.latitude;
    delete formData.longitude;
    // update imageUrls field
    formData.imageUrls = uploadedImageUrls;
    // Add geolocation
    formData.geolocation = geolocation;
    // Add userRef
    formData.userRef = user.uid;
    // Add timestamp
    formData.timestamp = serverTimestamp();
    !formData.offer && delete formData.discountedPrice;
    // console.log("Data submitted to firestore", formData);

    // Add listing to firestore
    try {
      const docRef = await addDoc(collection(db, "listings"), formData);
      setProgress(1);

      toast.success("Listing successfully created!");
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }

      redirectTimer = setTimeout(() => {
        navigate(`/category/${formData.type}/${docRef.id}`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("unable to save Listing. Please try again");
      setLoading(false);
    }
  }

  return (
    <>
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
            <Button
              type="submit"
              size="lg"
              className="text-base w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <CgSpinnerTwo className="animate-spin" />
                  Please wait...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {loading ? <UploadFeedback progress={progress} /> : ""}
    </>
  );
}
