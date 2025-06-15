import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { CiEdit } from "react-icons/ci";

const MyFoodPage = () => {
  const [foodsData, setFoodsData] = useState([]);
  const badgeColors = {
    Seafood: "bg-orange-100 text-orange-700",
    Meat: "bg-red-100 text-red-700",
    Pasta: "bg-yellow-100 text-yellow-700",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsive = await fetch(`${import.meta.env.VITE_API_URL}/add-foods`);
        if (!responsive.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await responsive.json();
        setFoodsData(data);
      } catch (error) {
        console.log(`Error Fatching:`, error);
      }
    };
    fetchData();
  }, []);
  console.log(foodsData);
  return (
    <section className="font-plus">
      <div className="flex flex-col items-center justify-center bg-[#fef0e7] py-16">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-4xl lg:text-5xl">
          My Foods
        </h2>
        <p className="text-[16px] text-gray-600/60 mt-2.5">
          Manage your food items
        </p>
        <Link
          to={"/add-foods"}
          className="bg-teal-500 text-white font-semibold py-1 px-2.5 rounded-xl mt-2.5"
        >
          + Add New Food
        </Link>
      </div>
      {/* Show foodCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center container py-16">
        {foodsData.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative h-44 w-full bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={food.image || "/placeholder-image.jpg"}
                alt={food.food_name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                  badgeColors[food.type] || "bg-gray-100 text-gray-600"
                }`}
              >
                {food.categories}
              </span>
              <div className="absolute top-3 right-3 bg-white/50 backdrop-blur-md text-[12px] font-semibold px-2 py-1 rounded-full shadow text-orange-500">
                Qtn: {food.quantity}
              </div>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-800">
              {food.food_name}
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
              to={`/add-foods/${food._id}`}
              className="bg-blue-500 inline-flex justify-center items-center gap-1.5 text-white text-sm font-semibold py-2 rounded-xl hover:opacity-90 transition mt-4"
            >
              Upadate <CiEdit />
            </Link>
          </div>
        ))}
      </div>
      {foodsData.length === 0 && (
        <p className="text-centter py-10 text-gray-500">No Data Found</p>
      )}
    </section>
  );
};

export default MyFoodPage;
