import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  const { brand_id, brand_name, img } = brand;



  return (
    <Link to={`/brand/${brand_id}`}>
      <div className="card bg-base-100 shadow-xl image-full rounded-none cursor-pointer">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body flex justify-end">
          <h2 className="card-title">{brand_name}</h2>
          {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
