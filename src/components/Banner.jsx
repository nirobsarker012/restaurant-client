import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowRightLong, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useRef } from "react";

import img_1 from "../assets/img/restaurant_foof_img.jpg";
import img_2 from "../assets/img/res_table_chair.jpg";
import img_3 from "../assets/img/chef_img.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const fedup = (delay) => ({
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  },
});

export default function Banner() {
  const swiperRef = useRef(null);

  return (
    <div className="relative my-10">
      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-md"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-md"
      >
        <FaArrowRight />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false} // Disable default nav
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* SwiperSlide 1 */}
        <SwiperSlide className="relative">
          <img
            className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
            src={img_1}
            alt="Hero 1"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 px-4">
            <motion.span
              variants={fedup(0.2)}
              initial="hidden"
              whileInView="show"
              className="text-white inline-flex items-center gap-1.5 p-2 rounded-2xl bg-white/10 backdrop-blur-md"
            >
              ✨ Premium Dining Experience
            </motion.span>
            <motion.h2
              variants={fedup(0.3)}
              initial="hidden"
              whileInView="show"
              className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 play"
            >
              Welcome to <br />
              <motion.span
                variants={fedup(0.3)}
                initial="hidden"
                whileInView="show"
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
              >
                Delicious Bites
              </motion.span>
            </motion.h2>
            <p className="mb-4 text-white/80 max-w-2xl text-sm sm:text-base md:text-lg pop">
              Experience culinary excellence with our carefully crafted dishes made from the finest ingredients by world-class chefs
            </p>
            <div className="flex items-center gap-2.5">
              <Link
                to={"all-foods"}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-[10px] text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer"
              >
                See All Foods <FaArrowRightLong />
              </Link>
              <Link
                to={"/gallery"}
                className="bg-white/10 backdrop-blur-md border border-white px-4 py-3 rounded-[10px] cursor-pointer"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SwiperSlide 2 */}
        <SwiperSlide className="relative">
          <img
            className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
            src={img_2}
            alt="Hero 2"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 px-4">
            <motion.span
              variants={fedup(0.2)}
              initial="hidden"
              whileInView="show"
              className="text-white inline-flex items-center gap-1.5 p-2 rounded-2xl bg-white/10 backdrop-blur-md"
            >
              ✨ Premium Dining Experience
            </motion.span>
            <motion.h2
              variants={fedup(0.3)}
              initial="hidden"
              whileInView="show"
              className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 play"
            >
              Ambience <br />
              <motion.span
                variants={fedup(0.3)}
                initial="hidden"
                whileInView="show"
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
              >
                That Elevates
              </motion.span>
            </motion.h2>
            <p className="mb-4 text-white/80 max-w-2xl text-sm sm:text-base md:text-lg pop">
              Dine in a space designed for comfort and elegance...
            </p>
            <div className="flex items-center gap-2.5">
              <Link to={"all-foods"} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-[10px] text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer">
                See All Foods <FaArrowRightLong />
              </Link>
              <Link to={"/gallery"} className="bg-white/10 backdrop-blur-md border border-white px-4 py-3 rounded-[10px] cursor-pointer">
                View Gallery
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SwiperSlide 3 */}
        <SwiperSlide className="relative">
          <img
            className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
            src={img_3}
            alt="Hero 3"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 px-4">
            <motion.span
              variants={fedup(0.2)}
              initial="hidden"
              whileInView="show"
              className="text-white inline-flex items-center gap-1.5 p-2 rounded-2xl bg-white/10 backdrop-blur-md"
            >
              ✨ Premium Dining Experience
            </motion.span>
            <motion.h2
              variants={fedup(0.3)}
              initial="hidden"
              whileInView="show"
              className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 play"
            >
              Crafted by <br />
              <motion.span
                variants={fedup(0.3)}
                initial="hidden"
                whileInView="show"
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
              >
                Culinary Masters
              </motion.span>
            </motion.h2>
            <p className="mb-4 text-white/80 max-w-2xl text-sm sm:text-base md:text-lg pop">
              Led by renowned chefs, our kitchen is where expertise meets artistry...
            </p>
            <div className="flex items-center gap-2.5">
              <Link to={"all-foods"} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-[10px] text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer">
                See All Foods <FaArrowRightLong />
              </Link>
              <Link to={"/gallery"} className="bg-white/10 backdrop-blur-md border border-white px-4 py-3 rounded-[10px] cursor-pointer">
                View Gallery
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
