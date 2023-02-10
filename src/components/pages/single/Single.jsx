import React from 'react'
import './single.css'
import Sidebar from '../sidebar/Sidebar'
import SinglePosts from '../singlePost/singlePosts'
const Single = () => {
  
  return (
    <div className='single'>


        <SinglePosts/>
        <Sidebar/>

    </div>
  )
}

export default Single