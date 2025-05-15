import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";
import React from "react";
export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
