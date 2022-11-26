import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import DashboardNav from "./DashboardNav";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNav />
      <div className="drawer drawer-mobile">
        <input id="side-nav-btn" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="side-nav-btn" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard">My Orders</Link>
            </li>
            <li>
              <Link to="/dashboard/all-sellers">All Sellers</Link>
            </li>
            <li>
              <Link to="/dashboard/all-buyers">All Buyers</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
