import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const form = location?.state || "/";
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form2 = e.target;
    const email = form2.email.value;
    const password = form2.password.value;

    setTimeout(() => {
      login(email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          toast.success("Login Sucessfully");
          navigate(form);
          form.reset();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  const handleGoogleLogin = () => {
    googleLogin(provider)
      .then((res) => {
        toast.success("Logged in with Google!");
        navigate(form);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed.");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-plus">
      <div>
        <label className="text-sm font-medium">Email Address</label>
        <input
          name="email"
          type="email"
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      <button
      onClick={handleGoogleLogin}
      className="w-full inline-flex gap-1.5 text-[16px] items-center justify-center border border-gray-400 py-2 rounded-[5px] hover:text-blue-600 transition-all duration-200 cursor-pointer">
        Sign with Google <FcGoogle />
      </button>
      <div className="mt-4 p-3 text-sm bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
        <p className="font-medium">Demo Account Available:</p>
        <p>
          <strong>Email:</strong> user@example.com
        </p>
        <p>
          <strong>Password:</strong> password
        </p>
        <p className="mt-1">
          Or register a new account and login with those credentials!
        </p>
      </div>
    </form>
  );
};

export default Login;
