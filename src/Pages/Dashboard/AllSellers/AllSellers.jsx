import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllSellers = () => {
  const { data: all_sellers } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:2000/users?role=seller`);
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl mb-8">All Sellers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {all_sellers?.map((seller, i) => (
              <tr className="hover">
                <td>{i + 1}</td>

                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  <button className="btn btn-outline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
