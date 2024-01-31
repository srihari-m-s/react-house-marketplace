export default function BedsAndBathsInput({ form }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 formItem">
        <label htmlFor="bedrooms">Bedrooms</label>
        <input
          type="number"
          name="bedrooms"
          id="bedrooms"
          className="p-2 focus:outline-primary"
          placeholder="Bedrooms"
          {...form.register("bedrooms")}
          required
          min={1}
        />
        {form.errors?.regularPrice && <p role="alert">Bedrooms is Required</p>}
      </div>
      <div className="flex flex-col gap-2 formItem">
        <label htmlFor="bathrooms">Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          id="bathrooms"
          className="p-2 focus:outline-primary"
          placeholder="Bathrooms"
          {...form.register("bathrooms")}
          required
          min={1}
        />
        {form.errors?.regularPrice && <p role="alert">Bathrooms is Required</p>}
      </div>
    </div>
  );
}
