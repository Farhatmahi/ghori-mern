import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useToken from "../../hooks/useToken/useToken";

const Register = () => {
  const { user, createUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [createdUserEmail, setCreatedUserEmail] = useState(); //to get the email for useToken

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(createdUserEmail);
  const [token] = useToken(createdUserEmail);

  if (token) {
    navigate("/");
  }

  const handleRegister = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setCreatedUserEmail(data.email);
        const userInfo = {
          displayName: data.fullName,
        };
        updateUser(userInfo)
          .then((result) => {
            let isVerified = false;
            saveToDatabase(
              data.fullName,
              data.email,
              data.role,
              data?.photoURL,
              isVerified
            );

            toast.success(`Welcome, ${data.fullName}`);
            navigate("/");
          })
          .catch((err) => {});
      })
      .catch((err) => {
        console.log(err.message);
        setError("Incorrect Password");
      });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setCreatedUserEmail(user.email);
        saveToDatabase(user.displayName, user.email, "buyer");
        setCreatedUserEmail(user.email);
        toast.success(`Welcome, ${user.displayName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveToDatabase = (name, email, role, image, isVerified) => {
    const person = { name, email, role, image, isVerified };
    fetch("https://assignment-12-server-farhatmahi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="hero min-h-screen lg:h-[600px]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:ml-20 lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold">New here!</h1>
          <p className="lg:py-6 pb-8">
            Register now to get access to all the cool features
          </p>
        </div>
        <div className="lg:w-1/2 flex-shrink-0 max-w-md border border-yellow-500 p-10">
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">What are you?</span>
              </label>
              <select
                className="input input-bordered w-full"
                {...register("role")}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            <p className="text-xs text-center my-4">
              Already have an account?{" "}
              <Link to="/login" className="hover:text-primary hover:underline">
                Log in
              </Link>
            </p>

            <input type="submit" className="btn btn-outline w-full" />
            <div className="divider">OR</div>
            <button onClick={handleGoogle} className="btn btn-outline w-full">
              Continue with Google
              <FcGoogle className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
