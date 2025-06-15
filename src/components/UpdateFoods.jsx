import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UpdateForm from './UpdateForm';

const UpdateFoods = () => {
  const { id } = useParams();
  console.log(id);
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleFood = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/add-foods/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch food data`);
        }
        const data = await response.json();
        setFood(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food:", error);
        setLoading(false);
      }
    };

    getSingleFood();
  }, [id]);
  console.log(food);

  return (
    <div>
      {!loading && food._id && <UpdateForm food={food} />}
      {loading && (
        <div className="text-center text-gray-500 py-4">
          <h2>Food data is loading...</h2>
        </div>
      )}
      {!loading && !food._id && (
        <div className="text-center text-red-500 py-4">
          <h2>Food data not found</h2>
        </div>
      )}
    </div>
  );
};

export default UpdateFoods;
