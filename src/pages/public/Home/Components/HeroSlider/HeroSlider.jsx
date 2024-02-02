import ImageCarousel from "@/components/homePage/ImageCarousel/ImageCarousel";
import PageSpinner from "@/components/shared/PageSpinner/PageSpinner";
import useFetchSlides from "@/hooks/useFetchSlides/useFetchSlides";

export default function HeroSlider() {
  const { error, loading, slideListings } = useFetchSlides();

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <div className="w-full h-[30vw] grid place-items-center">
        <p className="text-xl font-semibold">Error Fetching Slides</p>
      </div>
    );
  }

  return (
    <>
      <ImageCarousel hero={true} slideDataArray={slideListings} />
    </>
  );
}
