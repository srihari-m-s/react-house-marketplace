import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { FaUpload } from "react-icons/fa6";

export default function ImagesInput({ form, existingImages }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleImagesInput(e) {
    const files = e.target.files;
    setSelectedFiles(Object.values(files));
    // console.log(files[0]);
  }

  return (
    <div>
      <FormField
        control={form.control}
        name="imageUrls"
        render={({ field }) => (
          <FormItem className="formItem ">
            <FormLabel className="flex items-center gap-4 w-fit">
              Pictures <FaUpload className="text-xl" />
            </FormLabel>
            <FormDescription>
              Upload at most 6 image files of the property.
            </FormDescription>
            <FormDescription className="font-bold text-base">
              Note: Uploading new images will replace all current images.
            </FormDescription>
            <FormMessage />
            <FormControl>
              <input
                type="file"
                name="imageUrls"
                className="invisible h-0"
                required
                accept="image/*"
                multiple
                onInput={(e) => {
                  handleImagesInput(e);
                  field.onChange(Object.values(e.target.files));
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* New Files */}
      {selectedFiles.length ? (
        <Card>
          <CardHeader>Uploaded files</CardHeader>
          <CardContent>
            <div className="inline-flex flex-wrap gap-4">
              {selectedFiles.map((file, index) => {
                let pictureUrl = URL.createObjectURL(file);
                return (
                  <img
                    src={pictureUrl}
                    alt={file.name}
                    key={`${file.name}-${index}`}
                    className="rounded-xl h-48 w-48 object-cover border shadow-md"
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}

      {/* Existing Files */}
      {!selectedFiles.length && existingImages ? (
        <Card>
          <CardHeader>Current Images</CardHeader>
          <CardContent>
            <div className="inline-flex flex-wrap gap-4">
              {existingImages.map((url, index) => {
                return (
                  <img
                    src={url}
                    alt={"Property"}
                    key={`${url}-${index}`}
                    className="rounded-xl h-48 w-48 object-cover border shadow-md"
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}

ImagesInput.defaultProps = {
  existingImages: null,
};
