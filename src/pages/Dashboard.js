import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const userBlogs = await api.get(`/blogs`);
      setBlogs(userBlogs);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(blogId);
        fetchUserBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <h1>My Blogs</h1>
      <Link to="/blog/new" className="btn btn-primary">Create New Blog</Link>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>Status: {blog.status}</p>
            <Link to={`/blog/edit/${blog.id}`} className="btn btn-secondary">Edit</Link>
            <Link to={`/blog/preview/${blog.id}`} className="btn btn-info">Preview</Link>
            <button onClick={() => handleDeleteBlog(blog.id)} className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
