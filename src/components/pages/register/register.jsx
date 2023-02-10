import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css' ;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async(e)=>{
    e.preventDefault();//prevents from reloading and this makes the presence of text in the text-field 
    setError(false);
    try{

      const res = await  axios.post("/auth/register",{
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login')

    }catch(err){
      setError(true);
    }
  }




  return (
    <div className='register'>

<span className="registerTitle">
        Register
      </span>
      <form className="registerForm" onSubmit={handleSubmit}>  
        <label >Username</label>
        <input type="text" className='registerInput'  onChange={(e)=>setUsername(e.target.value)} placeholder ='Enter your Username....' />
        
        <label > Email</label>
        <input type="text" className='registerInput'  onChange={(e)=>setEmail(e.target.value)} placeholder ='Enter your email....' />
        <label>Password</label>
        <input type="text"  className='registerInput' onChange={(e)=>setPassword(e.target.value)} placeholder='*********' />

      <button className="registerButton"
      type="submit">Register</button>
      </form>
      <Link to = "/Login">
      <button className="registerLoginButton">Login</button>
      </Link>
      {error && <span className="warn" style={{color:"red",marginTop:"10px"}}>Already Used Email/Name</span>}
    </div>
  )
}

export default Register