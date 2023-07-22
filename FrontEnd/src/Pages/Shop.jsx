import { Link } from "react-router-dom";
import Fruits from "../Ressources/fruits.jpg";
import Vegies from "../Ressources/Vegies.jpg";
import  Notification from "../Components/Notification";

export default function () {

const sendGet=()=>{
  fetch('http://localhost:5000/api')
}

  return (
    <div>
      <Link to="/Fruits">
        <img src={Fruits} width="300" height="200" />
      </Link>
      <Link to="/Vegies">
        <img src={Vegies} width="300" height="200" />
      </Link>
      
     
    </div>
  );
}
