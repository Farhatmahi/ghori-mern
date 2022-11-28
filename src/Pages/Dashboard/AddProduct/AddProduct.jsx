import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";
import { format } from "date-fns";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const date = format(new Date(), 'PP')
  console.log(date);


  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);

  const imagebb = process.env.REACT_APP_imagebb;

  const handleAddProduct = (data) => {
    // console.log(data)
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?&key=${imagebb}`;
    fetch(url, {
      method: "POST",
      
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          let brand_id = "";
          if (data.brand_name === "Rolex") {
            brand_id = 3;
          }
          if (data.brand_name === "Titan") {
            brand_id = 4;
          }
          if (data.brand_name === "Casio") {
            brand_id = 1;
          }
          if (data.brand_name === "Seiko") {
            brand_id = 2;
          }

          const product = {
            product_name: data.product_name,
            brand_name: data.brand_name,
            original_price: data.original_price,
            resale_price: data.resale_price,
            years_of_use: parseInt(data.years_of_use),
            product_img: imgData.data.url,
            seller_name: user.displayName,
            email: user.email,
            brand_id: brand_id,
            date_posted : date,
            isAvailable : true,
          };
          console.log(product);
          //save products to db
          fetch("http://localhost:2000/allProducts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              // authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success("Product uploaded");
              navigate("/dashboard/my-products");
            });
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="lg:w-[990px] mx-4">
      <h2 className="text-3xl mb-4">Add a Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Product name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("product_name", {
                required: "Product name is required",
              })}
            />
            {errors.product_name && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.product_name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("brand_name", {
                required: "Brand is required",
              })}
            />
            {errors.brand_name && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.brand_name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("phone", {
                required: "Phone Number is required",
              })}
            />
            {errors.phone && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.phone?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("original_price", {
                required: "Original Price is required",
              })}
            />
            {errors.original_price && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.original_price?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Selling Price</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("resale_price", {
                required: "Selling Price is required",
              })}
            />
            {errors.resale_price && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.resale_price?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Conditiom</span>
            </label>
            <select
              {...register("conidition", { required: "Condition is required" })}
              className="select select-bordered w-full max-w-md"
            >
              <option disabled selected>
                Pick a condition
              </option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.location?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Years of use</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("years_of_use", {
                required: "Year of use is required",
              })}
            />
            {errors.years_of_use && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.years_of_use?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.description?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full max-w-md"
              {...register("image", { required: "Photo is required" })}
            />
            {errors.img && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.img?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Publish Product"
            className="btn btn-accent btn-wide my-4"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
