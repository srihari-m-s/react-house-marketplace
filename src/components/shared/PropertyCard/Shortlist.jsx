import { useState } from "react";
import IconHeart from "../svgIcons/IconHeart";

export default function Shortlist() {
  const [shortlisted, setShortlisted] = useState(false);

  // Handle short list click
  async function handleShortlistClick() {
    setShortlisted((prev) => !prev);
  }

  return (
    <div>
      <button
        className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center bg-white"
        onClick={handleShortlistClick}
      >
        <IconHeart
          className={`text-xl ${shortlisted ? "text-red-600" : "text-white"}`}
        />
      </button>
    </div>
  );
}
