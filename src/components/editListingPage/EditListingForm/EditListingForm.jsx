import UploadFeedback from "@/components/createListingPage/UploadFeedback/UploadFeedback";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import { db } from "@/firbase.config";
import { deleteFileByDownloadUrl, storeImage } from "@/helpers/FireStorage";
import { editListingSchema } from "@/helpers/FormSchemas";
import BedsAndBathsInput from "@/pages/private/CreateListing/Components/BedsAndBathsInput/BedsAndBathsInput";
import GeolocationInput from "@/pages/private/CreateListing/Components/GeolocationInput/GeolocationInput";
import ImagesInput from "@/pages/private/CreateListing/Components/ImagesInput/ImagesInput";
import NameAndLocationInput from "@/pages/private/CreateListing/Components/NameAndLocationInput/NameAndLocationInput";
import OfferInput from "@/pages/private/CreateListing/Components/OfferInput/OfferInput";
import ParkingAndFurnitureInput from "@/pages/private/CreateListing/Components/ParkingAndFurnitureInput/ParkingAndFurnitureInput";
import TypeInput from "@/pages/private/CreateListing/Components/TypeInput/TypeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function EditListingForm({ listingData, listingId }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      name: listingData.name,
      location: listingData.location,
      type: listingData.type,
      offer: listingData.offer,
      regularPrice: listingData.regularPrice,
      discountedPrice: listingData.discountedPrice || 0,
      parking: listingData.parking,
      furnitured: listingData.furnitured,
      bedrooms: listingData.bedrooms,
      bathrooms: listingData.bathrooms,
      latitude: listingData.geolocation.lat || 0,
      longitude: listingData.geolocation.lng || 0,
      imageUrls: listingData.imageUrls,
    },
  });
  //   local states
  const [useGeocoding, setUseGeocoding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  let redirectTimer;

  async function handleUpdateListing(values) {
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

    // if new files are uploaded store images in firebase
    let uploadedImageUrls;
    if (formData.imageUrls[0] instanceof File) {
      let imageProgressStep = 0.5 / formData.imageUrls.length;
      uploadedImageUrls = await Promise.all(
        [...formData.imageUrls].map((image) =>
          storeImage(image, () =>
            setProgress((prev) => prev + imageProgressStep)
          )
        )
      ).catch(() => {
        setLoading(false);
        toast.error("Upload of images failed. Please try again.");
        return;
      });

      // Delete old files from storage
      await Promise.all(
        [...listingData.imageUrls].map((imageUrl) =>
          deleteFileByDownloadUrl(imageUrl)
        )
      )
        .then(() => {
          console.log("Deleted old images");
        })
        .catch(() => {
          console.log("Error deleting old images");
        });
    } else {
      uploadedImageUrls = formData.imageUrls;
      setProgress(0.5);
    }

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

    // Update Listing
    try {
      const docRef = doc(db, "listings", listingId);
      await updateDoc(docRef, formData);
      setProgress(1);

      toast.success("Listing successfully updated!");
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }

      redirectTimer = setTimeout(() => {
        navigate(`/category/${formData.type}/${docRef.id}`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Unable to save Listing. Please try again");
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateListing)}
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
          <ImagesInput form={form} existingImages={listingData.imageUrls} />
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
