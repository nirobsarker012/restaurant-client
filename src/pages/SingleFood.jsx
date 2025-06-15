import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import { getAllFoods } from "../db/all-foods";
import useAuth from "../hooks/useAuth";

const SingleFood = () => {
  const { user } = useAuth();
  const { foodId } = useParams();

  const { data: foods = [], isFetching } = useQuery({
    queryFn: getAllFoods,
    queryKey: ["all-foods"],
  });

  const food = foods.find((item) => item._id === foodId);

  if (isFetching) {
    return (
      <div className="bg-indigo-500 p-24 rounded-md shadow-lg">
        <h2 className="text-white text-2xl font-semibold text-center">
          Data is being loaded from MongoDB...
        </h2>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-20 text-red-600 text-xl font-semibold">
        Food item not found.
      </div>
    );
  }

  return (
    <section className="container py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Image */}
      <div className="bg-gray-100 h-[400px] rounded-xl flex items-center justify-center overflow-hidden">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-gray-400 text-xl">Image not available</div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-5">
        <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
          {food.type}
        </span>
        <h1 className="text-3xl font-bold">{food.name}</h1>
        <h2 className="text-2xl font-bold text-orange-500">${food.price}</h2>

        {/* Quantity Info */}
        <div className="flex gap-10 text-center">
          <div>
            <p className="text-gray-500 text-sm">Available</p>
            <p className="text-xl font-semibold">{food.available}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Sold</p>
            <p className="text-xl font-semibold">{food.sold}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Origin</h3>
          <p className="text-gray-600">{food.origin || "Unknown"}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
          <p className="text-gray-600">{food.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Ingredients</h3>
          <p className="text-gray-600">
            {food.ingredients?.join(", ") || "N/A"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Added By</h3>
          <p className="text-blue-600">{food.addedBy || "Unknown Chef"}</p>
        </div>

        {/* Login Notice */}
        {user ? (
          // Logged in: Show active button
          <Link to={`/food-purchase/${food._id}`} className="w-full mt-3 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2">
            🛒 Purchase Now
          </Link>
        ) : (
          // Not logged in: Show notice + disabled button
          <>
            <div className="bg-orange-50 border border-orange-200 text-orange-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              ⚠️ Please log in to purchase this item.
            </div>
            <button
              className="w-full mt-3 py-3 bg-gray-300 text-gray-500 text-lg font-medium rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
              disabled
            >
              🛒 Purchase Now
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default SingleFood;
