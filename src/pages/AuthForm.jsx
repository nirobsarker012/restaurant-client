// AuthForm.jsx
import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Welcome</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Sign in to your account or create a new one
        </p>

        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              isSignIn ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              !isSignIn ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {isSignIn ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthForm;
