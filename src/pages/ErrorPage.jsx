import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import error_img from "../assets/json/Animation - 1749217626729.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 text-center p-6">
      <div className="w-[500px] hidden lg:block">
        <Lottie animationData={error_img} loop={true} />
      </div>
      <div className="lg:hidden">
        <h1 className="text-5xl font-bold text-red-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
      </div>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved. Please go
        back to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 cursor-pointer"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
