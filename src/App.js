import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Topbar from './components/topbar/Topbar.jsx';
import Home from './components/pages/Home';
import Write from './components/pages/write/write';
import Settings from './components/pages/settings/Settings';
import Register from './components/pages/register/register.jsx';
import Login from '././components/pages/login/Login.jsx'
import Single from "./components/pages/single/Single";
import Post from './components/pages/posts/Posts.jsx';
import {useContext} from "react";
import {Context} from "./context/Context";//imported context where the action and reducers are confined into the function with initial states



function App() {

  // now we will create pseudo user
  //later the psudo user depends on the context

  const {user } = useContext(Context);

  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route  exact path = "/" 
        element={<Home/>}/>
          
        
      <Route  path = "/register" element={user ? <Home/>:<Register/>}/>
      <Route path="/login" element={user ? <Home/>:<Login/>} />
      <Route path="/write" element={user ? <Write/>:<Register/>} />
      
      <Route path="/settings" element={user ? <Settings/>:<Register/>} />
      <Route path="/single" element={user ? <Post/>:<Register/>} />
      <Route path="/post/:postId" element={user ? <Single />:<Register/>} />

      </Routes>
  
   </Router>
  );
}

export default App;
