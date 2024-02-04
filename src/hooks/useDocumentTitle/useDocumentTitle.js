import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    let formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    document.title = formattedTitle + " | House Marketplace";
  }, [title]);
  return;
}
