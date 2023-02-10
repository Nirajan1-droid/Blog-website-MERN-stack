import React from 'react'
 import {Link} from 'react-router-dom'
import './post.css'



const Post = ({post}) => {
  const PF = "http://localhost:5000/images/";

  return (
    <div className='Post'>
      { post.photo && 
      (

        <img  className ="PostImg"src={PF + post.photo} alt="" />
        )
}
      <div className="PostInfo">
        <div className="PostCats">
          {post.categories.map((c)=>(

          <span className="PostCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}className="link">
        <span className="PostTitle">{post.title}</span>
        </Link>
        <hr/>
        <span className="PostDate">{new Date(post.createdAt).toDateString()}</span>
      
      <p className="postDisc">{post.disc}</p>     
    </div> 
  </div>
  )
}

export default Post;