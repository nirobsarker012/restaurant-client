import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFoods } from "../db/all-foods";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router";
import {motion} from 'motion/react'
import { fedup } from "../components/Banner";

const AllFood = () => {
  const { data: foods = [], isFetching } = useQuery({
    queryFn: getAllFoods,
    queryKey: ["all-foods"],
  });

  const [searchQuery, setSearchQuery] = useState("");

  const badgeColors = {
    Seafood: "bg-orange-100 text-orange-700",
    Meat: "bg-red-100 text-red-700",
    Pasta: "bg-yellow-100 text-yellow-700",
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="font-plus">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center bg-[#fef0e7] py-16">
        <motion.h2
          variants={fedup(0.3)}
          initial="hidden"
          whileInView="show"
        className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-4xl lg:text-5xl">All Foods</motion.h2>
        <motion.p
          variants={fedup(0.2)}
          initial="hidden"
          whileInView="show"
        className="text-[16px] text-gray-600/60 mt-2.5">Discover our complete menu</motion.p>
      </div>

      {/* Search bar */}
      <div className="flex items-center justify-center my-10">
        <div className="relative flex items-center max-w-sm w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleOnChange}
            placeholder="Search food by name"
            className="w-full pl-10 pr-4 py-2 border border-gray-700/50 hover:border-orange-700/50 rounded-lg outline-none"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Foods Grid */}
      <div className="container py-12">
        {isFetching ? (
          <div className="bg-red-500 p-16 rounded-lg shadow-lg text-white text-center text-xl">
            Data is being loaded from MongoDB...
          </div>
        ) : filteredFoods.length > 0 ? (
          <motion.div
          variants={fedup(0.6)}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <div key={food._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
                <div className="relative h-44 w-full bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={food.image || "/placeholder-image.jpg"}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                      badgeColors[food.type] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {food.type}
                  </span>
                  <div className="absolute top-3 right-3 bg-white/50 backdrop-blur-md text-[12px] font-semibold px-2 py-1 rounded-full shadow text-orange-500">
                    Qtn: {food.available}
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                  {food.name}
                </h3>
                <div className="mt-1 text-[18px] font-bold text-orange-600">
                  ${food.price.toFixed(2)}{" "}
                  {food.discountPrice && (
                    <span className="text-sm text-gray-400 line-through font-normal">
                      ${food.discountPrice.toFixed(2)}
                    </span>
                  )}
                </div>
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
      </div>
    </section>
  );
};

export default AllFood;
