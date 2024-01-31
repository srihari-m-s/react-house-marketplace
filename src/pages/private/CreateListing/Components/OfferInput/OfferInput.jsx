import { useState } from "react";

export default function OfferInput({ form }) {
  const [isOffer, setIsOffer] = useState(false);

  function handleOfferClick(e) {
    setIsOffer(e.target.checked);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="parking" className="cursor-pointer">
          Offer
        </label>
        <input
          type="checkbox"
          name="offer"
          id="offer"
          className="custom-checkbox"
          {...form.register("parking")}
          onClick={handleOfferClick}
        />
      </div>

      {/* Prices */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 formItem">
          <label htmlFor="reg-price">Regular Price</label>
          <input
            type="number"
            name="regularPrice"
            id="reg-price"
            className="p-2 focus:outline-primary"
            placeholder="Regular Price"
            {...form.register("regularPrice")}
            required
          />
          {form.errors?.regularPrice && (
            <p role="alert">Regular Price is Required</p>
          )}
        </div>
        <div className="flex flex-col gap-2 formItem">
          <label htmlFor="discounted-price">Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            id="discounted-price"
            className="p-2 focus:outline-primary disabled:bg-gray-300 "
            placeholder="Discounted Price"
            disabled={!isOffer}
            required={isOffer}
            {...form.register("discountedPrice")}
          />
          {form.errors?.regularPrice && (
            <p role="alert">Regular Price is Required</p>
          )}
        </div>
      </div>
    </div>
  );
}
