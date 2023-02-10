import {Link} from 'react-router-dom';
import './topbar.css';
import { useContext } from 'react';
import { Context } from '../../context/Context';
const Topbar = () => {
    const {user,dispatch } = useContext(Context);
    const PF  = "http://localhost:5000/images/"
    const handleLogout = () => {
        dispatch({type:"LOGOUT"});
    }



    return (
    <div className='topbar'>
        <div className="topleft">
            <i className="topIcon fa-brands fa-facebook"></i>
            <i className="topIcon fa-brands fa-twitter"></i>
            <i className="topIcon fa-brands fa-pinterest"></i>
            <i className="topIcon fa-brands fa-google"></i>
        </div>
        <div className="toplist">
              {user?(
                  <ul className='topList'>
                <li className="topListItem">
                    <Link className='link' to="/">Home</Link>
                </li>
                {/* <li className="topListItem"><Link  className='link' to = "/" >Home</Link></li> */}
                <li className="topListItem">
                    <Link className='link' to="/about">About</Link>
                </li>
                <li className="topListItem">
                    <Link className='link' to="/write">Write</Link>
                </li>

                <li className="topListItem" onClick={handleLogout}>
                    <Link className='link' to="/Login">Logout</Link>
                </li>


</ul>
):(
  <ul className='topList'>
  <li className="topListItem">
                        <Link to='/Register' className='link'>Register</Link>
                    </li>
                    </ul>
)

}
        </div>
        <div className="topright">
            {
            user ? (
                <Link to='/settings'   >
                <img className='topImg' src={PF + user.profilePic} alt=""/>
                </Link>


            ) : (<ul className="topList">
                    <li className="topListItem">
                        <Link to='/Login' className='link'>Login</Link>
                    </li>
                    
                    </ul>
                    )
                    }
             </div>
             </div>       



  
    

    )
}



export default Topbar;
