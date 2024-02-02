import { DummyHome } from "@/assets/dummy";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
// import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel({ imageUrls, address, price, hero }) {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  function handleIndicatorClick(_, index) {
    console.log("Go to:", index);
    api.scrollTo(index);
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      className="w-full relative"
      setApi={setApi}
      opts={{
        loop: true,
        duration: 30,
      }}
      //   plugins={[
      //     Autoplay({
      //       delay: 5000,
      //     }),
      //   ]}
    >
      <CarouselContent>
        {imageUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className="overflow-hidden">
                <CardContent className="flex items-center justify-center p-0 relative before:absolute before:inset-0 before:bg-neutral-900 before:bg-opacity-30 h-[30vw]">
                  <img
                    src={url || DummyHome}
                    alt="Dummy Home"
                    className="w-full object-cover"
                  />

                  {hero ? (
                    <div className="absolute bottom-10 left-10 space-y-2">
                      <h1 className="text-4xl text-white">{address}</h1>
                      <Badge className={"text-xl rounded-full px-6"}>
                        {price}
                      </Badge>
                    </div>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
      {api && (
        <div
          className={`absolute bottom-5 left-5 right-5 flex items-center justify-center gap-4`}
        >
          {Array.from({ length: api.scrollSnapList().length }).map(
            (_, index) => {
              return (
                <button
                  key={index}
                  onClick={(e) => handleIndicatorClick(e, index)}
                >
                  <div
                    className={
                      current === index
                        ? "w-5 h-5 rounded-full bg-white"
                        : "w-3 h-3 rounded-full bg-white/60"
                    }
                  ></div>
                </button>
              );
            }
          )}
        </div>
      )}
    </Carousel>
  );
}

ImageCarousel.defaultProps = {
  imageUrls: [DummyHome, DummyHome, DummyHome, DummyHome, DummyHome],
  address: "",
  price: "",
  hero: false,
};
