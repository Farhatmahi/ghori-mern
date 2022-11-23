import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
        setError("Incorrect Password");
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="ml-20 w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold">New here!</h1>
          <p className="py-6">
            Register now to get access to all the cool features
          </p>
        </div>
        <div className="w-1/2 flex-shrink-0 max-w-sm border border-yellow-500 p-10">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p role="alert" className="text-error text-xs mt-2">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p role="alert" className="text-error text-xs mt-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p role="alert" className="text-error text-xs mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <p className="text-xs text-center my-4">
              New here?{" "}
              <Link
                to="/register"
                className="hover:text-primary hover:underline"
              >
                Create a new account
              </Link>
            </p>

            <input type="submit" className="btn btn-primary w-full" />
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
