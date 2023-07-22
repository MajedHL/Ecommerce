import Product from "../Components/Product.jsx";
import { vegies } from "../Vegies.js";
export default function () {
  return (
    <div>
      {vegies.map((veg) => {
        return <Product data={veg} />;
      })}
    </div>
  );
}
