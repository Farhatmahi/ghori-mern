import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import BrandCard from "./BrandCard";

const FeaturedBrands = () => {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-farhatmahi.vercel.app/brands"
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl lg:text-5xl mb-2 text-center lg:text-left">
        Browse By Brands
      </h1>
      <p className="mb-8 text-center lg:text-left">
        We got a lot of collections
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrands;
