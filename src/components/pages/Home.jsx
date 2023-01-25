import {useEffect, useState } from "react";
import Header from "../header/Header"
import Posts from "./posts/Posts"
import Sidebar from "./sidebar/Sidebar"
import './home.css';
import axios from "axios";
import { useLocation } from "react-router-dom";

 
function Home() {
const [posts,   setPosts]   = useState([]);

const { search } = useLocation();


useEffect(()=>{
  const fetchPosts = async()=>{
    //returns the response from the proxy/posts
    const res = await axios.get('/posts'+ search);
    setPosts(res.data)
  }
  fetchPosts()
},[search]);

 

  return (

    <>
      <Header />
      <div className="home">
        {/* //passing original posts as props to other component */}
        <Posts posts = {posts}/>
     
        <Sidebar />
      </div>


    </>
  );
}

export default Home