import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';

const SingleBlogView = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="single-blog-view">
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <div className="blog-content">{ReactHtmlParser(blog.content)}</div>
      {blog.media && (
        <div className="blog-media">
          {blog.media.map((item, index) => (

            item.type==="image" && (
             <img key={index} src={item.url} alt={`Blog media ${index + 1}`} width="50%" height="50%" />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleBlogView;