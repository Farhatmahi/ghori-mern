import React, { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:2000/users/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
        //   console.log(data);
          setIsSeller(data.isSeller);
          setIsSellerLoading(false);
        });
    }
  }, [email, isSellerLoading]);
  return [isSeller];
};

export default useSeller;
