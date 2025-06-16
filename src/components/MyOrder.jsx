import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MyOrder_List from "./MyOrder_List";
import { IoBagAdd } from "react-icons/io5";
import {Link} from 'react-router'
import axios from "axios";
import useAuth from "../hooks/useAuth";

const MyOrder = () => {
  const {user, loading} = useAuth();
  // console.log(`Token int the context`, user.accessToken);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}my-orders?email=${user?.email}`,
      {
        headers:{
          authorization : `Bearer ${user?.email}`
        }
      }
    ).then(data=>
    {
      setOrderData(data?.data)
    }
    ).catch(err=>
    {
      console.log(err);
    }
    )
  }, [user?.email]);
  // Handle remove data form the ui
  const handleRemoveFromUI = (id) => {
    setOrderData((prev) => prev.filter((order) => order._id !== id));
  };

  if(loading) return <h1>Loading data.....</h1>

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#fef0e7] py-16">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-4xl lg:text-5xl">
          My Orders
        </h2>
        <p className="text-[16px] text-gray-600/60 mt-2.5">
          Track your food orders
        </p>
        <span className="inline-flex items-center gap-1 text-[16px] text-gray-600/60 mt-2.5">
          <IoBagAdd />
          {orderData.length} orders found
        </span>
      </div>
      {orderData.map((order) => (
        <MyOrder_List
          key={Math.random()}
          onRemove={handleRemoveFromUI}
          order={order}
        />
      ))}
      {
        orderData.length === 0 ? (
          <>
          <p className="flex items-center justify-center h-[100px] text-red-500">You haven't choose any order yet</p>
          <Link className='text-blue-500 underline text-center block' to={'/'}>Go to home</Link> 
          </>
        ) : null
      }
    </div>
  );
};

export default MyOrder;
