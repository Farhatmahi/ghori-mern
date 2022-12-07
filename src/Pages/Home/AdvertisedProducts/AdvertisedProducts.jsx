import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import Modal from "../../../Shared/Modal/Modal";
import ProductCard from "../../../Shared/ProductCard/ProductCard";

const AdvertisedProducts = () => {
  const [hideModal, setHideModal] = useState(null);
  const [display, setDisplay] = useState(false);
  const { data: adsProduct = [], isLoading } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-farhatmahi.vercel.app/ads"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    adsProduct.length > 0 && (
      <div className={``}>
        <h1 className="text-5xl ">Advertised Products</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {adsProduct.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              hideModal={hideModal}
              setHideModal={setHideModal}
            />
          ))}
          {hideModal && (
            <Modal hideModal={hideModal} setHideModal={setHideModal} />
          )}
        </div>
      </div>
    )
  );
};

export default AdvertisedProducts;
