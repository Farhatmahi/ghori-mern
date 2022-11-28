import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyOrders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: () => {
      fetch(
        `https://assignment-12-server-farhatmahi.vercel.app/orders?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            logOut();
          }
          return res.json();
        })
        .then((data) => setMyOrders(data));
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(myOrders);

  return (
    <div>
      <h1 className="text-3xl mb-8">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Product Image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.map((orders, i) => (
              <tr className="hover">
                <th>{i + 1}</th>
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
