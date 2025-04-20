import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const blog = await api.get(`/blogs/${id}`);
      setTitle(blog.title);
      setContent(blog.content);
      setStatus(blog.status);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/blogs/${id}`,{ title, content, status });
      } else {
        await  api.post(`/blogs`,{ title, content, status });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <div className="blog-editor">
      <h1>{id ? 'Edit Blog' : 'Create New Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
        <Editor
          value={content}
          onEditorChange={(newContent) => setContent(newContent)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default BlogEditor;
