import axios from 'axios'
import React from 'react'
import Sidebar from '../sidebar/Sidebar' 
import './settings.css'
import { Context } from '../../../context/Context'
import { useContext } from'react'
import { useState } from'react';
 
 
const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const {user,dispatch } = useContext(Context);
  // const location = useLocation();
  // const link =  location.pathname.split('/')[2];
  const PF = "http://localhost:5000/images/";

   
  const handleSubmit = async (e) => {
   e.preventDefault();
   dispatch({type:"Update_START"})
      const userUpdate = {
    userId:user._id,
    username,
    email,
    password,
    
   };

   if (file){
    const data = new FormData();//
    const filename = Date.now() + file.name;//
    data.append('name', filename);//
    data.append('file',file);//
    userUpdate.profilePic = filename;//
    try {
        
          await axios.post("/upload",data);
         
        
    }catch(err){}
}
try{
 const res = await axios.put("/update/"+user._id,userUpdate);

     setSuccess(true); 
       dispatch({type:"Update_SUCCESS", payload : res.data})

    // res.status(200).json(res)
}catch(err){
  dispatch({type:"Update_ERROR"})
}

  }
  return (
    <div className='Settings'>
      <div className="settingsWrapper">
        <div className="settingTitle">
          <span className="settingsUpdateTitle">
            Update your account
          </span>
          <br></br>
          <span className="settingsDeleteTitle">
            Delete your account
          </span>
        </div>
        <form  className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
         
         
         
         < div className="settingsPP">
           <img  className='settingsImg' src={file ? URL.createObjectURL(file) : (PF + user.profilePic)} 
              alt=''/>
              
            
            <label htmlFor='fileInput'>
              <i className="settingsPPIcon fa-solid fa-user"></i>
            <input type="file" id="fileInput" onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
          </div>
         
           
          <label htmlFor=""   >UserName</label>
          <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
          <label htmlFor=""  >Email</label>
          <input type="text" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor=""  >Password</label>
          <input type="text" placeholder="*****" onChange={(e)=>setPassword(e.target.value)}/>
          
        <button className='settingsSubmit' type="submit">Update</button>
        {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
       </div>

       <Sidebar/>  
        </div>
  )
}

export default Settings