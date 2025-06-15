import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFoods } from "../db/all-foods";
import {motion} from 'motion/react'
import { fedup } from "../components/Banner";

const Gallery = () => {
  const { data: foods = [], isFetching } = useQuery({
    queryFn: getAllFoods,
    queryKey: ["all-foods"],
  });

  const [modalImage, setModalImage] = useState(null);

  const badgeColors = {
    Seafood: "bg-orange-100 text-orange-700",
    Meat: "bg-red-100 text-red-700",
    Pasta: "bg-yellow-100 text-yellow-700",
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    document.getElementById("gallery_modal").showModal();
  };

  return (
    <section className="font-plus">
      <div className="flex flex-col items-center justify-center bg-[#fef0e7] py-16">
        <motion.h2
          variants={fedup(0.3)}
          initial="hidden"
          whileInView="show"
        className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-4xl lg:text-5xl">
          Gallery
        </motion.h2>

        <motion.p
          variants={fedup(0.5)}
          initial="hidden"
          whileInView="show"
        className="text-[16px] text-gray-600/60 mt-2.5">
          Explore our culinary creations
        </motion.p>
      </div>

      {/* All Foods Items */}
      <div className="container">
        {isFetching ? (
          <div className="bg-red-500 p-16 rounded-lg shadow-lg text-white text-center text-xl">
            Data is being loaded from MongoDB...
          </div>
        ) : foods.length > 0 ? (
          <motion.div
          variants={fedup(0.7)}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="relative h-44 w-full bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handleImageClick(food.image)}
                  />

                  <span
                    className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full ${
                      badgeColors[food.type] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {food.type}
                  </span>

                  <div className="absolute top-3 right-3 bg-white/50 backdrop-blur-md text-[12px] font-semibold px-2 py-1 rounded-full shadow text-orange-500">
                    Qtn: {food.available}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500">No food items found.</div>
        )}
      </div>

      {/* Global Modal */}
      <dialog id="gallery_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <img
            src={modalImage}
            alt="Selected food"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
};

export default Gallery;
