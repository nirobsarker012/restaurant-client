import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/img/logo.png";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/all-foods", label: "All Foods" },
    { to: "/gallery", label: "Gallery" },
    ...(user
      ? [
          { to: "/my-foods", label: "My Foods" },
          { to: "/add-foods", label: "Add Food" },
          { to: "/my-order", label: "My Orders" },
        ]
      : []),
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire("Logged Out!", "You have been logged out.", "success");
            setIsMobileMenuOpen(false);
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to log out.", "error");
          });
      }
    });
  };

  return (
    <header className="font-plus shadow-lg relative z-50">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-between container mx-auto items-center px-4"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-1">
          <img className="w-[100px]" src={logo} alt="logo" />
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-2xl lg:text-3xl">
            Kobayashi Bites
          </h3>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex justify-center gap-4 items-center">
          {navItems.map((item) => (
            <li key={item.to} className="relative group">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 transition ${
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 border-b border-orange-700"
                      : "text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-x-4">
          {/* Theme btn */}
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />
          {user ? (
            <>
              <div className="bg-gray-400 w-[40px] h-[40px] flex items-center justify-center rounded-full  text-white font-semibold">
                {/* <span>{user.displayName.charAt(0)}</span> */}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth-form" className="hover:underline">
                Register
              </NavLink>
              <NavLink
                to="/auth-form"
                className="bg-gradient-to-r from-orange-500 to-red-500 py-2 px-4 rounded-[5px] transition-all duration-300 hover:-translate-y-0.5 text-white"
              >
                Sign in
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}

        <button
          className="lg:hidden cursor-pointer text-[24px]"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <CiMenuFries />
        </button>
      </motion.nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl"
              >
                <IoMdClose />
              </button>
            </div>
            <ul className="flex flex-col gap-4 dark:text-white">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
                          : "text-gray-800"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {!user ? (
                <>
                  <li>
                    <NavLink to="/auth-form" className="text-gray-800">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/auth-form"
                      className="bg-gradient-to-r from-orange-500 to-red-500 py-2 px-4 rounded block text-center mt-2 text-white"
                    >
                      Sign in
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-red-500 text-white w-full py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
