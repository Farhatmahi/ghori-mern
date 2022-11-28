import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin/useAdmin";
import useSeller from "../hooks/useSeller/UseSeller";

import DashboardNav from "./DashboardNav";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user.email);
  const [isSeller] = useSeller(user.email)
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
            {!isAdmin && !isSeller && <li>
              <Link to="/dashboard/my-orders">My Orders</Link>
            </li>}
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/all-sellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/all-buyers">All Buyers</Link>
                </li>
              </>
            )}
            {
              isSeller && <>
              <li>
                <Link to='/dashboard/my-products'>My Products</Link>
              </li>
              <li>
                <Link to='/dashboard/add-product'>Add a Product</Link>
              </li>
              <li>
                <Link to='/dashboard/my-buyers'>My Buyers</Link>
              </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
