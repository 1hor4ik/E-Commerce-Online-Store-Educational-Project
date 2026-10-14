import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "@chakra-ui/react";
import { Autoplay, Pagination } from "swiper/modules";
import sneakerpic from "../assets/sneakerpic.jpg";
import image2 from "../assets/image2.jpg";
import carhartt4pic from "../assets/carhartt4webp.webp";
import "./Slider.css";

const Slider: React.FC = () => {
  return (
    <div className="slider-container">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={800}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="Slide">
          <Image
            boxSize="100%"
            objectFit="cover"
            src={sneakerpic}
            alt="Sneakers"
          />
        </SwiperSlide>
        <SwiperSlide className="Slide">
          <Image boxSize="100%" objectFit="cover" src={image2} alt="Clothes" />
        </SwiperSlide>
        <SwiperSlide className="Slide">
          <Image
            boxSize="100%"
            objectFit="cover"
            src={carhartt4pic}
            alt="Clothes"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
