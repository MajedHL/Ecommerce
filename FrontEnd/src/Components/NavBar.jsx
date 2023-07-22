import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import './Styles/navBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Styles/DropDown.css'
import Log from './Log';
import { useRef } from "react";

export default function () {
  //state
  const loginRef=useRef();
  //Behaviours
  const handleLogin=()=>{
    loginRef.current.setOpen(true)
  }
  //Display
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

      <Dropdown.Menu >
        <Dropdown.Item ><FontAwesomeIcon icon={faUserPlus} /> Sign Up</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogin}>Login <FontAwesomeIcon icon={faSignInAlt}  style={{ cursor: 'pointer' }} /></Dropdown.Item> 
        <Dropdown.Divider />
        <Dropdown.Item ><FontAwesomeIcon icon={faUser}  style={{ cursor: 'pointer' }} /> Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey='3'> <FontAwesomeIcon icon={faSignOutAlt}  style={{ cursor: 'pointer' }} /> Logout</Dropdown.Item>
          
      </Dropdown.Menu>
    </Dropdown>

    {loginRef && (<Log ref={loginRef}/>)}
      
     
    </div>
  );
}
