import { Link, useNavigate  } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import './Styles/navBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Styles/DropDown.css'
import Log from './Log';
import SignUp from './SignUp'
import { useRef, useContext } from "react";
import UserInfo from "../Pages/UserInfo";
import axios from 'axios';
import {Context} from './Context.jsx'

export default function () {
  
  const {setIsLoggedIn}=useContext(Context);
  const loginRef=useRef();
  const navigate = useNavigate();
  const handleLogin=()=>{
    loginRef.current.setOpen(true)
  }

  const signUpRef=useRef();
  
  const handleSignUp=()=>{
    signUpRef.current.setOpen(true)
  }

  const handleLogOut=async()=>{
    try{
      await axios.post('http://localhost:5000/auth/logOut',null, { withCredentials: true })      
      setIsLoggedIn(false)
      navigate("/");
    }catch(e){
      console.log(e.message)
    }
  }

  
  
  return (
    <div className="NavBar">
      
        <Link to="/"><div id="Shop">Shop</div></Link>
        <Link to="/Cart">
        <div id="Cart"> <ShoppingCart size={32} /></div>
        </Link>
        <Dropdown>
      <Dropdown.Toggle variant="blank" id="dropdown-basic" className="text-white fw-bold">
        Log
      </Dropdown.Toggle>

      <Dropdown.Menu id="">
        <Dropdown.Item onClick={handleSignUp} ><FontAwesomeIcon icon={faUserPlus} /> Sign Up</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogin}>Login <FontAwesomeIcon icon={faSignInAlt}  style={{ cursor: 'pointer' }} /></Dropdown.Item> 
        <Dropdown.Divider />
        <Dropdown.Item >  <FontAwesomeIcon icon={faUser}  style={{ cursor: 'pointer' }} />  <Link to='/Profile' style={{color:"black",fontWeight: "normal"}} >Profile</Link>  </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey='3' onClick={handleLogOut}> <FontAwesomeIcon icon={faSignOutAlt}  style={{ cursor: 'pointer' }} /> Logout</Dropdown.Item>
          
      </Dropdown.Menu>
    </Dropdown>

    {loginRef && (<Log ref={loginRef}/>)}
    {signUpRef && (<SignUp ref={signUpRef}/>)}
    
    </div>
  );
}
