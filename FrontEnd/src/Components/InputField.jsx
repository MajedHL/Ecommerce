import { useContext, useState } from "react";
import { Context } from "../Components/Context";
export default function (props) {
  const itemId = props.itemId;
  var [input, setinput] = useState("");
  const { addItems } = useContext(Context);

  const handlechange = (event) => {
    let value = event.target.value;
    setinput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItems(itemId, input);
    console.log('id:'+itemId)
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
