import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  axios
    .get("https://assignment-12-server-farhatmahi.vercel.app/blogs")
    .then((data) => {
      setBlogs(data.data);
      // console.log(data);
    });

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl text-center mb-8">Blogs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
