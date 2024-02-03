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
import { useNavigate } from "react-router-dom";

export default function ImageCarousel({ slideDataArray, hero }) {
  const navigate = useNavigate();
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle Indicator click
  function handleIndicatorClick(_, index) {
    // console.log("Go to:", index);
    api.scrollTo(index);
  }

  // Handle content click
  function handleContentClick(type, id) {
    if (!hero) {
      return;
    }

    navigate(`/category/${type}/${id}`);
  }

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
        {slideDataArray.map((data, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className="overflow-hidden rounded-none border-0 lg:rounded-xl">
                <CardContent
                  className={`h-[400px] md:h-[500px] xl:h-[600px] flex items-center justify-center p-0 relative ${
                    hero
                      ? "before:absolute before:inset-0 before:bg-neutral-900 before:bg-opacity-30 cursor-pointer"
                      : ""
                  }`}
                  onClick={() => handleContentClick(data.type, data.id)}
                >
                  <img
                    src={hero ? data.imageUrl || DummyHome : data || DummyHome}
                    alt="Dummy Home"
                    className="w-full h-full object-cover"
                  />
                  {hero ? (
                    <div className="absolute bottom-16 lg:bottom-10 left-0 lg:left-10 space-y-2">
                      <h1 className="md:text-2xl lg:text-4xl text-white bg-gray-800 p-2 rounded">
                        {data.address}
                      </h1>
                      <div className="space-x-4">
                        <Badge
                          className={
                            "text-base lg:text-xl rounded-full px-6 capitalize"
                          }
                          variant={"success"}
                        >
                          {data.type}
                        </Badge>
                        <Badge
                          className={"text-base lg:text-xl rounded-full px-6"}
                        >
                          {data.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Badge>
                      </div>
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
  slideDataArray: [DummyHome, DummyHome, DummyHome, DummyHome, DummyHome],
  hero: false,
};
