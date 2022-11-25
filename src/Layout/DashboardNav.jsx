import React from "react";
import { TfiLayoutSidebarLeft } from 'react-icons/tfi';

const DashboardNav = () => {
  return (
    <div className="navbar bg-base-100">
      <label
          tabIndex={0}
          className="btn btn-ghost border border-yellow-500 lg:hidden"
          htmlFor="side-nav-btn"
        >
          <TfiLayoutSidebarLeft className="" />
        </label>
    </div>
  );
};

export default DashboardNav;
