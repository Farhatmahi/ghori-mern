import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    login(data.email, data.password)
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
    <div className="flex justify-around items-center flex-row-reverse">
      <div className="">
        <h1 className='text-5xl'>Login</h1>
        <p className='text-xl'>To get all access</p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-control w-full max-w-xs">
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
        <div className="form-control w-full max-w-xs">
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
        <p className="text-xs text-center">
          New here?{" "}
          <Link to="/register" className="hover:text-primary hover:underline">
            Create a new account
          </Link>
        </p>

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Login;
