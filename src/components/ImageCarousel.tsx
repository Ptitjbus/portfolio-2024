"use client";

import React, { useCallback } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { GroupField } from "@prismicio/client";
import {
  ProjectPageDocumentDataImagesItem,
  Simplify,
} from "../../prismicio-types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const ImageCarousel = ({
  images,
  className,
}: {
  images: GroupField<Simplify<ProjectPageDocumentDataImagesItem>>;
  className?: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative group w-full ${className}`}>
      <div
        className="overflow-hidden bg-gray-100 lg:rounded-lg lg:border-2 lg:border-gray-300"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((item, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <PrismicNextImage
                priority={index === 0}
                field={item.project_image}
                className="h-full object-cover select-none w-full aspect-video"
                width={960}
                height={540}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-50 hover:bg-gray-100 p-2 lg:p-3 [&_svg]:w-10 [&_svg]:h-10 lg:[&_svg]:w-8 lg:[&_svg]:h-8 rounded-full shadow-md z-10 text-sky-400 ring-0 hover:ring-2 hover:ring-sky-400 transition-all hover:scale-105"
        aria-label="Précédent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-50 hover:bg-gray-100 p-2 lg:p-3 [&_svg]:w-10 [&_svg]:h-10 lg:[&_svg]:w-8 lg:[&_svg]:h-8 rounded-full shadow-md z-10 text-sky-400 ring-0 hover:ring-2 hover:ring-sky-400 transition-all hover:scale-105"
        aria-label="Suivant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 items-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 transition-all rounded-full ${
              selectedIndex === index
                ? "bg-sky-400 scale-125"
                : "bg-sky-200 scale-100"
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
