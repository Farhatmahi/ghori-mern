import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Modal from "../../Shared/Modal/Modal";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import { brand_id_context } from "../Home/FeaturedBrands/BrandCard";

const BrandProducts = () => {
  const products = useLoaderData();

  const { loading } = useContext(AuthContext);

  const [brand, setBrand] = useState();
  const [hideModal, setHideModal] = useState(null);
  // console.log(hideModal);
  useEffect(() => {
    fetch("https://assignment-12-server-farhatmahi.vercel.app/brands", {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBrand(data));
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log(brand)

  // const {data : products = []} = useQuery({t
  //   queryKey : ['products', products[0].brand_id],
  //   queryFn : async() => {
  //     const res = await fetch(`https://assignment-12-server-farhatmahi.vercel.app/allProducts/${products[0].brand_id}`)
  //     return await res.json()
  //   }
  // })

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
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

export default BrandProducts;
