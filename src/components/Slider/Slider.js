import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";

import "./slider.scss";

function Slider({ data }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: "true",
        disableOnInteraction: false,
      }}
      effect={"fade"}
      loop
      speed={2000}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
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
