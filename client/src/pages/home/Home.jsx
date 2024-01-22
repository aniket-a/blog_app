import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();


  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const res = await axios.get(`${url}/posts/`+search);
        setPosts(res?.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    getAllPost();
  }, [search, url]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
