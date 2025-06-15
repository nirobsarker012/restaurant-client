import React from "react";
import { CiClock2, CiDeliveryTruck } from "react-icons/ci";
import { LuLeaf } from "react-icons/lu";
import {motion} from 'motion/react';
import { fedup } from "./Banner";

const serviceList = [
  {
    id: 1,
    icon: <CiClock2 size={28} color="#fff" />,
    title: "Online Reservation",
    description: "Book your table online and skip the wait",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    id: 2,
    icon: <CiDeliveryTruck size={28} color="#fff" />,
    title: "Quick Delivery",
    description: "Fast delivery to your doorstep within 30 minutes",
    bgColor: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    id: 3,
    icon: <LuLeaf size={28} color="#fff" />,
    title: "Organic Ingredients",
    description: "Fresh, organic ingredients sourced locally",
    bgColor: "bg-gradient-to-br from-orange-400 to-red-400",
  },
];

const Service = () => {
  return (
    <section className="container mx-auto px-4 py-16 font-plus lg:py-36">
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
                  variants={fedup(0.4)}
          initial="hidden"
          whileInView="show"
        className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2.5">
          Our Services
        </motion.h2>
        <motion.p
          variants={fedup(0.6)}
          initial="hidden"
          whileInView="show"
        className="text-gray-500 text-sm md:text-base">
          We provide exceptional services to enhance your dining experiences
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {serviceList.map((item) => (
          <div key={item.id} className="flex flex-col items-center hover:-translate-y-1.5 transition-all duration-300">
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 ${item.bgColor}`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-700/80">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
