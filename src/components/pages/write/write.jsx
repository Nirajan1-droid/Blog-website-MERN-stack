import React from 'react'
import "./write.css"
import axios from "axios";
import {Context} from '../../../context/Context';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';

export default function Write() 
{

    const [title, setTitle] = useState("");
    const [disc, setDisc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);
 
    const handleSubmite=async(e)=> {
        e.preventDefault();
        const newPost =   {
            username : user.username,
            title,
            disc,
        };
        if(file){
            const data = new FormData();//
            const filename = Date.now() + file.name;//
            data.append('name', filename);//
            data.append('file',file);//
            newPost.photo = filename;//
            try {
                
                  await axios.post("/upload",data);
                 
                
            }catch(err){}
        }
        try{
            const res = await axios.post('/posts',newPost);
            window.location.replace('/post/' + res.data._id);
            // res.status(200).json(res)
        }catch(err){
            
        }
      
        };


return (
    <div className='write'>
        {file && (
            
            <img className="writeImg" src={URL.createObjectURL(file)} alt=""/>
            )
    }
        <form action="" className="writeForm"
        onSubmit={handleSubmite}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput" className="">
                    <i class="writeIcon fa-solid fa-plus"></i>

                </label>
                <input type="file" id="fileInput"
                    style={
                        {display: "none"}
                    }
                    onChange={(e)=>setFile(e.target.files[0])}/>
                <input type="text" placeholder="Title" id="" className='writeInput' onChange={(e)=>setTitle(e.target.value)}
                    autoFocus={true}/> {/* whenever we refresh the page the auto focus will auto focous the hover in the input type text area */} </div>


            <div className="writeFormGroup" onChange={(e)=>setDisc(e.target.value)}>
                <textarea placeholder='Tell your story...' type='text' className='writeInput writeText'></textarea>
            </div>
            <button className='writeSubmit' type='onsubmit'>Publish</button>


        </form>
    </div>
);
}