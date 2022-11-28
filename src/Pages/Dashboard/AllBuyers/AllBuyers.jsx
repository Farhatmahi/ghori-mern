import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllBuyers = () => {
  const { data: all_buyers, refetch } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-farhatmahi.vercel.app/users?role=buyer`
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://assignment-12-server-farhatmahi.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("User deleted successfully");
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl mb-8">All Buyers</h1>
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
            {all_buyers?.map((buyer, i) => (
              <tr className="hover">
                <td>{i + 1}</td>

                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(buyer._id)}
                    className="btn btn-outline"
                  >
                    Remove
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

export default AllBuyers;
