import React from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const MyOrder_List = ({ order, onRemove }) => {
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}my-orders/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success",
              });
              onRemove(_id);
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden mb-6 hover:shadow-xl transition-shadow">
        <div className="md:w-1/4 flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 relative">
          <img src={order.image} alt={order.foodName} className="w-full object-cover rounded" />
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            Order #{order._id}
          </span>
        </div>

        <div className="flex-1 p-4 md:px-6 text-gray-800">
          <h3 className="text-xl font-semibold text-orange-600">
            {order.foodName}
          </h3>
          <p><span className="font-medium">Food name:</span> {order.name}</p>
          <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
          <p><span className="font-medium">Price per item:</span> {order.price}</p>
          <p><span className="font-medium">Contact:</span> {order.email}</p>
          <p><span className="font-medium">Ordered:</span> {order.date}</p>
        </div>

        <div className="flex flex-col justify-between items-end p-4 gap-4 md:w-40">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">
              ${parseFloat(order.price.replace("$", "") * order.quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => handleDelete(order._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrder_List;
