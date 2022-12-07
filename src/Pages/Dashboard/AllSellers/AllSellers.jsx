import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const { data: all_sellers, refetch } = useQuery({
    queryKey: ["all-buyers"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-farhatmahi.vercel.app/users?role=seller`
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

  const handleVerify = (id) => {
    // console.log(id)
    fetch(
      `https://assignment-12-server-farhatmahi.vercel.app/users/verified/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("User verified");
        }
        if (data.modifiedCount === 0) {
          toast("Already verified");
        }
      });
  };

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
              <th>Status</th>
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
                  <button
                    onClick={() => {
                      handleVerify(seller._id);
                    }}
                    className="btn btn-outline"
                  >
                    Verify
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(seller._id);
                    }}
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

export default AllSellers;
