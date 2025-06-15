import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CiStar } from "react-icons/ci";
import { topFoods } from "../db/all-foods";
import { Link } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { fedup } from "./Banner";
import { motion } from "motion/react";
const badgeColors = {
  Seafood: "bg-orange-100 text-orange-700",
  Meat: "bg-red-100 text-red-700",
  Pasta: "bg-yellow-100 text-yellow-700",
};

const TopFood = () => {
  const foodQuery = useQuery({
    queryFn: () => topFoods(),
    queryKey: ["all-foods"],
  });


  return (
    <div className="container mx-auto px-4 py-8 font-plus">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.span
          variants={fedup(0.2)}
          initial="hidden"
          whileInView="show"
        className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 py-1 px-3 rounded-full text-sm font-medium dark:text-white">
          <CiStar /> Most Popular
        </motion.span>
        <motion.h2
          variants={fedup(0.5)}
          initial="hidden"
          whileInView="show"
        className="text-3xl lg:text-5xl font-bold text-gray-800 mt-3">
          Top Foods
        </motion.h2>
        <motion.p
          variants={fedup(0.7)}
          initial="hidden"
          whileInView="show"
        className="text-sm lg:text-base text-gray-600 mt-1">
          Discover our most beloved dishes that keep customers coming back for
          more
        </motion.p>
      </div>

      {/* Grid */}
      {foodQuery.isFetching ? (
        <div className="bg-red-500 p-16 rounded-lg shadow-lg text-white text-center text-xl">
          Data is being loaded from MongoDB...
        </div>
      ) : foodQuery.data?.length > 0 ? (
        <motion.div
          variants={fedup(0.12)}
          initial="hidden"
          whileInView="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodQuery.data.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative h-44 w-full bg-gray-100 rounded-xl overflow-hidden">
                {/* Food Image */}
                <img
                  src={food.image || "/placeholder-image.jpg"}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Type Badge - Top Left */}
                <span
                  className={`absolute top-3 left-3 translate-x-0 translate-y-0 text-xs font-medium px-3 py-1 rounded-full ${
                    badgeColors[food.type] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {food.type}
                </span>

                {/* Rating Badge - Top Right */}
                <div className="absolute top-3 right-3 translate-x-0 translate-y-0 bg-white text-sm font-semibold px-2 py-1 rounded-full shadow text-gray-800 flex items-center gap-1">
                  ⭐ {food.rating}
                </div>
              </div>

              {/* Type Badge */}

              {/* Name */}
              <h3 className="mt-2 text-lg font-semibold text-gray-800">
                {food.name}
              </h3>

              {/* Price */}
              <div className="mt-1 text-[18px] font-bold text-orange-600">
                ${food.price.toFixed(2)}{" "}
                <span className="text-sm text-gray-400 line-through font-normal">
                  ${food.discountPrice?.toFixed(2)}
                </span>
              </div>

              {/* Button */}
              <Link
                to={`/single-food/${food._id}`}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-semibold py-2 rounded-xl hover:opacity-90 transition mt-4 text-center"
              >
                View Details →
              </Link>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-gray-500">No food items found.</div>
      )}
      {/* See All foods btn */}
      <div className="flex items-center justify-center">
        <Link to={'/all-foods'} className="text-orange-600 border border-orange-600 py-1.5 px-2.5 rounded-[5px] inline-flex items-center gap-1 text-[14px] hover:bg-gradient-to-r from-orange-400 to-red-400 hover:text-white transition-all duration-200 mt-12 font-semibold">
          See All Foods <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default TopFood;
