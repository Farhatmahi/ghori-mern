import React, { useEffect, useState } from "react";

const TopNewsCard = ({ n }) => {
  const {news_title, news_img} = n
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={news_img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{news_title}</h2>
      </div>
    </div>
  );
};

export default TopNewsCard;
