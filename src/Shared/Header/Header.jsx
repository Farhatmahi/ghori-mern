import { format } from "date-fns";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user?.uid && <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>}
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
    </>
  );

  const todaysDate = format(new Date(), "PP");
  // console.log(todaysDate)

  //temporary logout
  const handleLogOut = (e) => {
    e.preventDefault();
    logOut()
      .then((result) => {
        console.log("done");
      })
      .catch((err) => {});
  };
  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <p className='hidden lg:block lg:ml-4'>{todaysDate}</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <Link to='/'><h1 className="text-4xl">Ghori</h1></Link>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <Link className="flex items-center">
              <div className="avatar">
                <div className="w-8 lg:w-12 rounded-full">
                  <img src={user?.photoURL} alt="" />
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className=" lg:block btn btn-outline ml-3"
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline">Log in/Register</button>
            </Link>
          )}
        </div>
      </div>

      <div className="navbar bg-base-100 hidden lg:block">
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex lg:justify-center">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>
        <div className="navbar-end"></div>
        
      </div>
      
    </div>
  );
};

export default Header;
