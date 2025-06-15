import React from "react";
import { MdStars } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Customer = () => {
  const customerData = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Emily Johnson",
      designation: "Food Blogger",
      comment:
        "Absolutely loved the flavors! The pasta was cooked to perfection and the sauce was heavenly.",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      name: "Michael Lee",
      designation: "Chef & Reviewer",
      comment:
        "The seafood dishes here are fresh, authentic, and taste like a seaside escape. Highly recommended!",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/60.jpg",
      name: "Sarah Martinez",
      designation: "Lifestyle Influencer",
      comment:
        "I’m impressed with the service and presentation. Every dish was Instagram-worthy and delicious.",
    },
  ];
  return (
    <div className=" bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-26 font-plus">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2.5">
          What Our Customers Say's
        </h2>
        <p
          className="mb-9
"
        >
          Don't just take our word for it - hear from our satisfied customers
        </p>
      </div>
      <div className="flex justify-between gap-4 items-center container flex-wrap md:flex-nowrap">
        {customerData.map((singleCustomerData) => (
          <div key={Math.random()} className="bg-white/20 backdrop-blur-md p-4 border border-white rounded-2xl hover:-translate-y-2.5 transition-all duration-300">
            <div className="flex items-center gap-2.5">
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={singleCustomerData.image}
                alt=""
              />
              <div className="flex flex-col space-y-1">
                <h4 className="font-bold">{singleCustomerData.name}</h4>
                <div className="flex items-center gap-0.5 text-yellow-400">
                  <span className="text-green-700">
                    <MdStars />
                  </span>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-[14px]">
                  {singleCustomerData.designation}
                </span>
              </div>
            </div>
            <p className="max-w-[380px] italic mt-1.5">
              {singleCustomerData.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
