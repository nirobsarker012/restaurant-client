import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

const UpdateForm = ({ food }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    updatedFood.price = parseFloat(updatedFood.price);
    updatedFood.quantity = parseInt(updatedFood.quantity);

    try {
      const res = await fetch(`http://localhost:3000/add-food/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFood),
      });

      const data = await res.json();

      if (data.modifiedCount) {
        toast.success("Food item updated successfully!");
        form.reset();
        navigate("/my-foods");
      } else {
        toast.warning("No changes were made.");
      }
    } catch (error) {
      toast.error("Failed to update food item.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        📝 Update Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Food Name *</label>
            <input
              defaultValue={food?.food_name}
              name="food_name"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Food name"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Price *</label>
            <input
              defaultValue={food.price}
              name="price"
              type="number"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Price"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL *</label>
          <input
            defaultValue={food.image}
            name="image"
            type="url"
            required
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Food Category *</label>
            <select
              defaultValue={food.categories}
              name="categories"
              required
              className="w-full mt-1 p-2 border rounded-md"
            >
              <option value="">Select category</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Fruit">Fruit</option>
              <option value="Meat">Meat</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Quantity *</label>
            <input
              defaultValue={food.quantity}
              name="quantity"
              type="number"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Quantity"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Food Origin *</label>
          <input
            defaultValue={food.origin}
            name="origin"
            required
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="e.g., Dhaka, Bangladesh"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description / Ingredients *</label>
          <textarea
            defaultValue={food.description}
            name="description"
            required
            rows={3}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Describe the food or ingredients..."
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Added By (Name)</label>
            <input
              defaultValue={user?.displayName || ""}
              name="auth_name"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Your Name"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Added By (Email)</label>
            <input
              defaultValue={user?.email || ""}
              name="auth_email"
              type="email"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
