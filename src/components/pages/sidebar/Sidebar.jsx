import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css'
const Sidebar = () => {
    
    
    const [cats, setCat] = useState([]);
    useEffect(() => {
        
        const getcat = async() => {
            const res = await axios.get('/categories');
            setCat(res.data)

            
        }
        getcat();
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img src='https://th.bing.com/th/id/OIP.L5Idsv7you9zqZ69WgMhqQHaIV?pid=ImgDet&rs=1' alt=''/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Reprehenderit a sapiente debitis. Aut maxime ve
                     ritatis excepturi corporis illum ad itaque ratione et 
                     vero, eos esse nam voluptates blanditiis at quia quo incid
                     unt nesciunt, rerum nostrum doloribus tempore iste dolor? Qu
                     as enim necessitatibus, vitae eligendi vero, voluptates aliqu
                     id deserunt beatae fugit nisi, quasi et excepturi.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c)=>
                        (
                            
                            <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                            </Link>
                            )
                            )}
                            
                 </ul>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">Follow Us</span>
            <div className="sidebarSocial">
            <i  className="sidebarIcon fa-brands fa-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i  className="sidebarIcon fa-brands fa-pinterest"></i>
                <i  className="sidebarIcon fa-brands fa-google"></i>
            </div>

            </div>
 
        </div>
    )
}

export default Sidebar
