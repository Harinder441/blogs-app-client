import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.excerpt}</p>
      <Link to={`/blog/${blog._id}`}>Read more</Link>
    </div>
  );
};

export default BlogCard;