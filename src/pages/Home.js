import React, { useEffect } from 'react';
import BlogFeed from '../components/BlogFeed';

const Home = () => {
  useEffect(() => {
    console.log("Rendering Home");
  }, []);
  return (
    <div>
      <h1>Welcome to our Blog</h1>
      <p>This is the public home page.</p>
      <BlogFeed />
    </div>
  );
};

export default Home;