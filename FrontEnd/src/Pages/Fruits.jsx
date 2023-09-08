import Product from "../Components/Product.jsx";
import { Context } from "../Components/Context.jsx";
import { useContext } from "react";
import { useEffect, useState } from "react";
export default function () {
  const {products }=useContext(Context);
  const [fruits, setFruits]=useState([]);
//FIXE filter products by type to get fruits
useEffect(()=>{
  let fruits=products.filter((product)=>product.productType==="fruit");
  setFruits(fruits)
},[products])
  return (
    <div>
      { fruits.map((fruit) => {
        return <Product key={fruit._id} data={fruit} />;
      })}
      
    </div>
  );
}
