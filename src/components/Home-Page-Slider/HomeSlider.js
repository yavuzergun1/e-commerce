import React from 'react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

function HomeSlider({ products }) {
    console.log(products);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={4}
      autoplay={{
        pauseOnMouseEnter: "true",
        disableOnInteraction: false,
      }}
      loop
      speed={10000}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
    >
      {products &&
        products.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={product.photos[0]} alt="" />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default HomeSlider