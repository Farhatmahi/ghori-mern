import React, { useContext, useEffect, useState } from "react";
import { FcApproval } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";

const ProductCard = ({ product, setHideModal }) => {
  const {
    product_name,
    brand_name,
    original_price,
    resale_price,
    product_img,
    seller_name,
    years_of_use,
    location,
    email,
    date_posted,
  } = product;

  const { loading } = useContext(AuthContext);
  const [verified, setVerified] = useState("");

  const url = `https://assignment-12-server-farhatmahi.vercel.app/users/verify/${email}`;

  useEffect(() => {
    fetch(
      `https://assignment-12-server-farhatmahi.vercel.app/users/verify/${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.isVerified);
        // console.log(url, data.isVerified);
        setVerified(data.isVerified);
      });
  }, [email]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={product_img}
          alt="Shoes"
          className="rounded-xl object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-row justify-between items-center">
          <h2 className="card-title text-left">{product_name}</h2>
          <div className="badge badge-outline">{brand_name}</div>
        </div>

        <p>Price : ${resale_price}</p>
        <p>
          <small>Original Price : ${original_price}</small>
        </p>
        <p>
          <small>
            Seller Name : {seller_name}
            {verified && <FcApproval className="inline ml-2" />}
          </small>
        </p>
        <p>
          <small>Location : {location}</small>
        </p>
        <p>
          <small>Years of Use: {years_of_use}</small>
        </p>
        <p>
          <small>Date posted: {date_posted}</small>
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
