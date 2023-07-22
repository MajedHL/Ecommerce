import InputField from "./InputField";
import {useLocation, Link} from 'react-router-dom';


export default function (props) {
  const {_id, title,price_U, image } = props.data;
  const location=useLocation();
  
  
  
  return (
    <div>
     <Link to={`${location.pathname}`+`/${_id}`}> <img src={image} width={250} height={200} /></Link>
      <div>
        <p>{title}</p>
        <p>
          ${price_U}/kg <InputField itemId={_id} />
        </p>        
      </div>
    </div>
  );
}
