import React from "react";

const Banner = () => {
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url("/src/clock/Casio-Gshock-ga700uc-5a__04944.1501719098.1280.1280_1800x1800.webp")` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Ghori.com</h1>
            <p className="mb-5">
              Find all 2nd hand Luxurious watches in a single website
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
