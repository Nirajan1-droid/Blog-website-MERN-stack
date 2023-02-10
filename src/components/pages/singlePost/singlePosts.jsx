import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './singlePost.css'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../../context/Context'
const SinglePosts = () => {
    const PF = "http://localhost:5000/images/";
    

    const location = useLocation();
    const link = location.pathname.split("/")[2];
    const { user } = useContext(Context);
    
    const [post, setPost] = useState({});//intitial state for setPost function in context constructor     
    const [title, setTitle] = useState("");
    
    const [Disc, setDisc] = useState("");
 
    const [updateMode, setUpdateMode] = useState(false);
    useEffect(() => {

        const getpost = async () => {
            const res = await axios.get("/posts/" + link);
            setPost(res.data)
            setTitle(res.data.title)
            setDisc(res.data.disc)

        };
        getpost();
    },[link]);

    const handleDelete = async() => {
               
        try{
            
            await axios.delete(`/posts/${post._id}`, {data:{username :user.username}});
             
            window.location.replace('/');
        }catch(err){}
    };
    const handleUpdate = async() => {
        try{
            await axios.put(`/posts/${post._id}`, { username :user.username,title:title, disc:Disc} );
            window.location.reload();

            
        }catch(err){}
    }

    


    return (
        <div className='singlePosts'>
            <div className="singlePostWrapper">
            {
                 post.photo &&(
            <img className="singlePostsImg" src={PF+ post.photo} alt=""/>
            )}

                {

                updateMode ? <input type = "text" value = {title} onChange={(e)=>setTitle(e.target.value)} className='singlePostTitleInput' autoFocus /> 
                :
    (            
                    
                
                <h1 className='singlePostTitle'>
                    {post.title}
                {  post.username === user.username && (
                    <div className="singlePostEdit">

                        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                        <i className="singlePostIcon fa-duotone fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>

                    </div>
                    )
                 }
                </h1>
    )
                }


                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author : 
                        <Link to={`/?user=${post.username}`} className="link">
                        <b>
                          {post.username}</b>
                        </Link>
                        
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}</span>
                </div>

                {updateMode ? <input type="text" className = 'singlePostDiscInput' value= {Disc} onChange={(e)=>setDisc(e.target.value)}/>
                :(

                    <p className='singlePostDisc'>
                {post.disc}
                </p>
                    )}
               
            </div>
                     <button className="UpdateButton" onClick={handleUpdate}>Update</button>
            

        </div>
    )
}
export default SinglePosts
