import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import BlogCard from './BlogCard';

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  console.log("Rendering BlogFeed");
  console.log("pageq,", page);

  useEffect(() => {
    console.log("Rendering BlogFeed uisefffs");
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs?page=${page}&limit=2`);
      setBlogs(prevBlogs => [...prevBlogs, ...response.data.blogs]);
      setPage(prevPage => prevPage + 1);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (page <= totalPages) {
        console.log("inside handleScroll", page);
        fetchBlogs();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, totalPages]);

  return (
    <div className="blog-feed">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
      {loading && <p>Loading more blogs...</p>}
    </div>
  );
};

export default BlogFeed;