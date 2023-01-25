import axios from 'axios';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/Context';
import { useContext } from 'react';
import './login.css'

export default function Login() 
{


  const userRef = useRef();
  const passwordRef = useRef()

  const {user , dispatch, isFetching } = useContext(Context);



  const handleSubmit= async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("/auth/login",{
          username : userRef.current.value,
          password : userRef.current.value,
        })
        dispatch({type :"LOGIN_SUCCESS", payload:res.data});
        

    }catch(err){ 
        dispatch({type:"LOGIN_FAILURE"})
    }
    


  };
  return (
    <div className='Login'>
      <span className="loginTitle">
      {/* <Link to ="/Login"> */}
        Login
      {/* </Link> */}
      </span>
      <form action="" className="loginForm" onSubmit={handleSubmit}>  
        <label htmlFor="" > Username</label>
        <input type="text" className='loginInput'  placeholder ='Enter your username....' 
        ref = {userRef}/>
        <label htmlFor="">Password</label>
        <input type="text"  className='loginInput' placeholder='*********' ref ={passwordRef}/>
      {/* <Link to ="/ "> */}
      <button className="loginButton" type ="onsubmit" disabled ={isFetching}>
        Login
      </button>
      {/* </Link> */}

      </form>
      <Link to ='/register'>
      <button className="loginRegisterButton">Register</button>
      </Link>
      </div>
  )
};
 