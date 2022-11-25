import React from "react";

const BlogCard = ({ blog }) => {
  const { question, answer } = blog;
  return (
    <div className="card glass">
      <div className="card-body">
        <h2 className="card-title">{question}</h2>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default BlogCard;
