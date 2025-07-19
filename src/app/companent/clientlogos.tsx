"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "../styles/client-logos-swiper.css"

const logos = [
  "/images/7.jpg",
  "/images/7.jpg",
  "/images/7.jpg",
  "/images/7.jpg",
  "/images/7.jpg",
];

export default function ClientLogos() {
  return (
    <section className="py-12 w-full flex flex-col justify-center items-center bg-gradient-to-b from-orange-50/80 via-white/90 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h2 className="text-center text-2xl font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 dark:from-yellow-400 dark:via-orange-500 dark:to-pink-500 animate-pulse">Müşteri Logoları</h2>
      <div className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 p-8 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center">
          <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
            speed={2500}
            slidesPerView={4}
            spaceBetween={32}
            grabCursor={true}
            allowTouchMove={false}
            className="client-logos-swiper"
          >
            {logos.concat(logos).map((logo, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-200 via-pink-200 to-blue-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                  <img src={logo} alt={`Logo ${index + 1}`} className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full drop-shadow-xl" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}