import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Modal from "../../../Shared/Modal/Modal";
import ProductCard from "../../../Shared/ProductCard/ProductCard";

const AdvertisedProducts = () => {
    const [hideModal, setHideModal] = useState(null);
  const { data: adsProduct = [], isLoading } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:2000/ads");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <h1 className='text-5xl'>Advertised Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {adsProduct.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            hideModal={hideModal}
            setHideModal={setHideModal}
          />
        ))}
        {/* {
          products.map(product => <Modal key={product._id} hideModal={hideModal} setHideModal={setHideModal} product={product}/>)
        } */}
        {hideModal && (
          <Modal hideModal={hideModal} setHideModal={setHideModal} />
        )}
      </div>
    </div>
  );
};

export default AdvertisedProducts;
