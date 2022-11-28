import React from "react";
// import {img404} from "../../clock/255-2550104_404-error-page-png-transparent-png-removebg-preview.png"
const ErrorPage = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-20">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">Oops, page not found</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <img src='https://i.ibb.co/D44Sn0s/255-2550104-404-error-page-png-transparent-png-removebg-preview.png' alt="" /> 
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
