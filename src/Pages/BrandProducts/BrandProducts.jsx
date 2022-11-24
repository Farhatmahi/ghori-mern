import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard/ProductCard";

const BrandProducts = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <div>
      this is brand product page
      
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrandProducts;
