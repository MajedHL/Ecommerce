import { useContext, useState } from "react";
import { Context } from "../Components/Context";
export default function (props) {
  
  const product=props.product;
  var [input, setinput] = useState("");
  const { addItems } = useContext(Context);

  const handlechange = (event) => {
    let value = event.target.value;
    setinput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItems(product, input);   
  };

  return (
    <div>
      <form name="InputForm" onSubmit={handleSubmit} action="submit">
        <input type="number" onChange={handlechange} min={0} />
        <button>Add to Cart</button>
      </form>
    </div>
  );
}
