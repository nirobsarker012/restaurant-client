import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from 'react-router';

const AddFood = () => {
    const navigate = useNavigate();
  const {user} = useAuth();

const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const newFoods = Object.fromEntries(formData.entries());

  // Convert numeric fields from string to number
  newFoods.price = parseFloat(newFoods.price);
  newFoods.quantity = parseInt(newFoods.quantity);

  // Send POST request to backend
  axios.post(`${import.meta.env.VITE_API_URL}add-foods`, newFoods)
    .then((res) => {
      console.log('Success:', res.data);
      navigate('/my-foods')
      toast.success("Data Added Sucessfully")
      form.reset(); // Optional: clear form
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to add food item.')
    });
};

  return (
    <div className="p-5 max-w-md mx-auto border border-gray-300 rounded-lg">
      <h2 className="text-center text-2xl font-bold">+ Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-5 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Food Name *</label>
            <input
            name='food_name'
              type="text"
              placeholder="Enter food name"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Price *</label>
            <input
            name='price'
              type="number"
              placeholder="0.00"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL *</label>
          <input
          name='image'
            type="text"
            placeholder="https://example.com/image.jpg"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex gap-5 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Food Category *</label>
            <select
            name='categories'
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select category</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="meat">Meat</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Quantity *</label>
            <input
            name='quantity'
              type="number"
              placeholder="Available quantity"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Food Origin *</label>
          <input
          name='origin'
            type="text"
            placeholder="e.g., Local Farm, Atlantic Ocean"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description / Ingredients *</label>
          <textarea
          name='description'
            placeholder="Describe the food item and list ingredients..."
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"
          />
        </div>
        <div className="flex gap-5 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Added By (Name)</label>
            <input
            name='auth_name'
              type="text"
              defaultValue={user.displayName}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Added By (Email)</label>
            <input
            name='auth_email'
              type="email"
              defaultValue={user.email}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          + Add Item
        </button>
      </form>
    </div>
  );
};

export default AddFood;