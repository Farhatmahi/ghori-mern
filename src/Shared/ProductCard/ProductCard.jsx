import React from "react";
import { FcApproval } from "react-icons/fc";

const ProductCard = ({ product, setHideModal }) => {
  const {
    product_name,
    brand,
    original_price,
    resale_price,
    product_img,
    seller_name,
    years_of_use,
    location,
    isVerified,
  } = product;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={product_img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row justify-between items-center">
          <h2 className="card-title text-center">{product_name}</h2>
          <div className="badge badge-outline">{brand}</div>
        </div>

        <p>Price : ${resale_price}</p>
        <p>
          <small>Original Price : ${original_price}</small>
        </p>
        <p>
          <small>
            Seller Name : {seller_name}
            {isVerified && <FcApproval className="inline ml-2" />}
          </small>
        </p>
        <p>
          <small>Location : {location}</small>
        </p>
        <p>
          <small>Years of Use: {years_of_use}</small>
        </p>
        <div className="card-actions">
          <label
            htmlFor="booking_modal"
            onClick={() => {
              setHideModal(product);
            }}
            className="btn btn-outline"
          >
            Book now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
