import React from "react";

const Banner = () => {
  return (
    <div className="">
      <div
        className="hero h-[500px]"
        style={{
          backgroundImage: `url("https://hodinkee.imgix.net/uploads/images/0cc465a7-9b0b-47e2-a597-5dc943e15ec4/Hamilton_KhakiFieldMurph38mm_H70405730_Lifestyle5-2.jpg?ixlib=rails-1.1.0&fm=jpg&q=55&auto=format&usm=12&fit=crop&ch=Width%2CDPR%2CSave-Data&alt=&ar=16%3A9&w=2400")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Ghori.com</h1>
            <p className="mb-5">
              Find all 2nd hand Luxurious watches in a single website
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
