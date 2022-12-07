import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useToken from "../../hooks/useToken/useToken";

const Register = () => {
  const { login, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loginUserEmail, setloginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //importantxp
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, token, from]);

  const handleLogin = (data) => {
    setError('')
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast(`Welcome back, ${user.displayName}`);
        setloginUserEmail(user.email);
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
        setloginUserEmail(user.email);
        toast(`Welcome back, ${user.displayName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero h-[600px]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:ml-20 lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">To get access to all the cool features</p>
        </div>
        <div className="lg:w-1/2 flex-shrink-0 max-w-md border border-white p-10">
          <form onSubmit={handleSubmit(handleLogin)}>
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

            <input type="submit" className="btn btn-outline w-full" />
            {error && (
              <p className="text-error text-xs mt-2 mb-3">{error}</p>
            )}
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
