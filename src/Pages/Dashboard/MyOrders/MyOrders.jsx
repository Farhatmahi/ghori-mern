import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";
import PaymentModal from "./PaymentModal";

const MyOrders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  const [order, setOrder] = useState(null);
  // const stripePromise = loadStripe(
  //   "pk_test_51M7FK2JH0OzhgIOy9rRnhZiTBKnIDP2aQJVRCrfYfNuLtnLZj2I5YeuvhaFQSgkNkvOHCtkG0KCb6ku5BkQfZNyO002uQYn9Jk"
  // );
  useEffect(() => {
    fetch(
      `https://assignment-12-server-farhatmahi.vercel.app/orders?email=${user?.email}`,
      {
        // headers: {
        //   authorization: `bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => setMyOrders(data));
  }, [user?.email, logOut]);

  console.log(myOrders);
  console.log(order);

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
              {/* <th>Payment</th> */}
            </tr>
          </thead>
          <tbody>
            {myOrders?.map((orders, i) => (
              <tr key={orders._id} className="hover">
                <th>{i + 1}</th>
                <th>
                  <img src={orders.product_img} className="w-24" alt="" />
                </th>
                <td>{orders.product_name}</td>
                <td>${orders.resale_price}</td>
                <td>
                  {/* <label
                    htmlFor="payment-modal"
                    onClick={() => setOrder(orders)}
                    className="btn btn-outline"
                  >
                    Pay
                  </label> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Elements stripe={stripePromise}>
      {order && <PaymentModal order={order} />}
      </Elements> */}
      
    </div>
  );
};

export default MyOrders;
