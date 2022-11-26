import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2000/orders?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl mb-8">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.map((orders) => (
              <tr className="hover">
                <th>
                  <img src={orders.product_img} className="w-24" alt="" />
                </th>
                <td>{orders.product_name}</td>
                <td>${orders.resale_price}</td>
                <td>
                  <button className="btn btn-outline">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
