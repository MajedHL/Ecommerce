import Product from "../Components/Product.jsx";
// import { fruits } from "../Fruits.js";
import { Context } from "../Components/Context.jsx";
import { useContext } from "react";
export default function () {
  const {fruits}=useContext(Context);
  return (
    <div>
      {fruits.map((fruit) => {
        return <Product key={fruit._id} data={fruit} />;
      })}
    </div>
  );
}
