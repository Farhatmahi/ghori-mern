import { useQuery } from "@tanstack/react-query";
import React from "react";
import TopNewsCard from "./TopNewsCard";

const TopNews = () => {
  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-farhatmahi.vercel.app/news"
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl lg:text-5xl text-center lg:text-left mb-8">
        Top News
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <TopNewsCard key={n._id} n={n} />
        ))}
      </div>
    </div>
  );
};

export default TopNews;
