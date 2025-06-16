// import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAllFoods } from "../db/all-foods";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "sonner";

const FoodPurchase = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState("1");
  const [totalPrice, setTotalPrice] = useState("0.00");

  const { data: foods = [], isFetching } = useQuery({
    queryFn: getAllFoods,
    queryKey: ["all-foods"],
  });

  const food = foods.find((item) => item._id === id);

  useEffect(() => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(food?.price) || 0;
    setTotalPrice((qty * prc).toFixed(2));
  }, [quantity, food?.price]);

  const orderDate = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

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

  // Handle The submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());
    console.log(newData);

    // Add data to the server
    axios.post(`${import.meta.env.VITE_API_URL}my-orders?email=${user?.email}`, newData,
      {
        headers:{
          authorization : `Bearer ${user?.accessToken}`
        }
      }
    ).then((res)=>{
      if(res.data)
      {
        navigate('/my-order');
        toast.success('Order Purchases Successfully')
      }
    }).catch((error)=>
    console.log(error))
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white rounded-2xl shadow-lg overflow-hidden font-plus">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white text-xl font-semibold flex items-center justify-center gap-2">
        <FaShoppingCart />
        Purchase Food
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Food Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Food Name</label>
          <input
            name="name"
            type="text"
            value={food.name}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Price (per item)
          </label>
          <input
            name="price"
            type="text"
            value={`$${food.price}`}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            max={food.available}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg border"
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            Maximum available: {food.available} items
          </p>
        </div>

        {/* Food Image */}
          <div>
          <label className="text-sm font-medium text-gray-700">
            Food Image
          </label>
          <input
            name="image"
            type="text"
            value={food.image}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Buyer Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Buyer Name
          </label>
          <input
            name="authName"
            type="text"
            defaultValue={user?.displayName || "Anonymous"}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Buyer Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Buyer Email
          </label>
          <input
            name="email"
            type="email"
            defaultValue={user?.email || ""}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Total Price */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-orange-600 text-lg font-bold text-right flex justify-between">
          Total Price: <span className="text-2xl">${totalPrice}</span>
        </div>

        {/* Order Date */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Order Date
          </label>
          <input
            name="date"
            type="text"
            value={orderDate}
            readOnly
            className="w-full mt-1 p-2 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-lg flex items-center justify-center gap-2"
        >
          <FaShoppingCart />
          Confirm Purchase – ${totalPrice}
        </button>
      </form>
    </div>
  );
};

export default FoodPurchase;
