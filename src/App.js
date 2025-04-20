import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SingleBlogView from './components/SingleBlogView';
import BlogEditor from './pages/BlogEditor';
import BlogPreview from './pages/BlogPreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<SingleBlogView />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/blog/new' element={<BlogEditor />} />
            <Route path='/blog/edit/:id' element={<BlogEditor />} />
            <Route path='/blog/preview/:id' element={<BlogPreview />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
