import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyProducts = () => {
    const {user} = useContext(AuthContext)
  const {data : myProducts = [], isLoading, refetch} = useQuery({
    queryKey : ['my-products'],
    queryFn : async() => {
        const res = await fetch(`http://localhost:2000/allProducts?email=${user.email}`)
        const data = await res.json()
        return data
    }
  });

  if(isLoading){
    return <Loading />
  }

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
            </tr>
          </thead>
          <tbody>
            {myProducts?.map((product, i) => (
              <tr className="hover">
                <td>{i + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.resale_price}</td>
                <td>Status</td>
                <td>
                  <button onClick={() => {}} className="btn btn-outline">Place Ad</button>
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
