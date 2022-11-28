import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [placed, setPlaced] = useState(false);
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-farhatmahi.vercel.app/allProducts?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handlePlaceAd = (id) => {
    // setPlaced(false)
    fetch(`http://localhost:2000/ads/product/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Advertisement placed!");
          setPlaced(true);
          refetch(); // it will make changes on the ui instantly
        }
        if (data.modifiedCount === 0) {
          toast("Already placed");
        }
        console.log(data);
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:2000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Product deleted successfully");
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(myProducts);

  return (
    <div>
      <h1 className="text-3xl mb-8">My Products</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myProducts?.map((product, i) => (
              <tr className="hover">
                <td>{i + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.resale_price}</td>
                <td>{product.availability ? "Available" : "Sold"}</td>
                <td>
                  <button
                    onClick={() => {
                      handlePlaceAd(product._id);
                    }}
                    className="btn btn-outline"
                  >
                    Place Ad
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDeleteProduct(product._id);
                    }}
                    className="btn btn-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
