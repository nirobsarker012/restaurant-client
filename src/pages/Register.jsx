import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { GoogleAuthProvider } from "firebase/auth";
import { useLocation,useNavigate } from "react-router";

const Register = () => {
  const provider = new GoogleAuthProvider();
  const location = useLocation()
    const navigate = useNavigate();
    const form = location?.state || "/";
  const { createUser, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const forms = e.target;
    const formData = new FormData(forms);
    const { email, password, confirmPassword, ...otherData } =
      Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      toast.error(`Password Doesn't match or Incorrect`);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      createUser(email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          toast.success("Login Sucessfully");
          navigate(form);
          forms.reset();
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
        <label className="text-sm font-medium">Full Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email Address</label>
        <input
          name="email"
          type="email"
          required
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="john@example.com"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            placeholder="Min 6 characters"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Confirm</label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Phone Number</label>
        <input
          name="number"
          type="tel"
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Address</label>
        <input
          name="address"
          type="text"
          className="w-full mt-1 px-4 py-2 border rounded-lg"
          placeholder="123 Main Street, City, State"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold text-white bg-green-500 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Loading..." : "Create Account"}
      </button>
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full inline-flex gap-1.5 text-[16px] items-center justify-center border border-gray-400 py-2 rounded-[5px] hover:text-blue-600 transition-all duration-200 cursor-pointer"
      >
        Sign with Google <FcGoogle />
      </button>
      <div className="mt-4 p-3 text-sm bg-green-50 text-green-700 rounded-lg border border-green-200">
        <p>
          <strong>
            After registration, you can login with your new credentials!
          </strong>
        </p>
      </div>
    </form>
  );
};

export default Register;
