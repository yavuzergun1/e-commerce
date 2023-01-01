import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./slider.scss"

function Slider({data}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 1000, pauseOnMouseEnter: "true" }}
      navigation
      loop
      pagination
       
    >
      {data &&
        data.photos.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={photo} alt="" />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default Slider;
