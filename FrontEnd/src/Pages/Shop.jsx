import { Link } from "react-router-dom";
import Fruits from "../Ressources/fruits.jpg";
import Vegies from "../Ressources/Vegies.jpg";
import  Notification from "../Components/Notification";

export default function (props) {
let routes=props.routes.filter((route)=>route.image)
//FIX

  return (
    <div>
      {/* <Link to="/Fruit">
        <img src={Fruits} width="300" height="200" />
      </Link>
      <Link to="/Veg">
        <img src={Vegies} width="300" height="200" />
      </Link> */}
      
     {routes.map((route)=>{
       return <Link to={route.path}><img src={route.image} width="300" height="200" /></Link>
     })}
    </div>
  );
}
