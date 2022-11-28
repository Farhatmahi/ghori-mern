import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import useSeller from "../../hooks/useSeller/UseSeller";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user.email);
  const [isSeller] = useSeller(user.email);
  return (
    <div className="flex justify-center items-center">
        <h1 className='text-5xl mt-20'>Welcome to dashboard</h1>
    </div>
  );
};

export default Dashboard;
