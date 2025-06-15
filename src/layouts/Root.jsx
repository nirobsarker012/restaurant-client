import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-334px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
