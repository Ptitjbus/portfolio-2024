"use client";

import React from "react";
import { PrismicNextImage } from "@prismicio/next";
import { GroupField } from "@prismicio/client";
import {
  ProjectPageDocumentDataImagesItem,
  Simplify,
} from "../../prismicio-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageCarousel = ({
  images,
}: {
  images: GroupField<Simplify<ProjectPageDocumentDataImagesItem>>;
}) => {
  return (
    <div className="relative h-full xl:h-3/6 w-full">
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="sm:max-w-[36rem] max-h-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <PrismicNextImage
              priority={index === 0}
              field={item.project_image}
              className="sm:max-w-[36rem] max-h-[20rem] object-cover"
              width={960}
              height={540}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
