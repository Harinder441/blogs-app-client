import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPreview } from '../utils/api';

function BlogPreview() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchBlogPreview();
  }, [id]);

  const fetchBlogPreview = async () => {
    try {
      const previewData = await getBlogPreview(id);
      setBlog(previewData);
    } catch (error) {
      console.error('Error fetching blog preview:', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-preview">
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

export default BlogPreview;
