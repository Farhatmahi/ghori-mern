import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: MyOrders = [] } = useQuery({
    queryKey: ["my_orders", user.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2000/orders?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return <div>my orders</div>;
};

export default MyOrders;
