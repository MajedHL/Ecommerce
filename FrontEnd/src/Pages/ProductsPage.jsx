import Product from "../Components/Product.jsx";
import { Context } from "../Components/Context.jsx";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
export default function () {
  
    const {products }=useContext(Context);
  const [pageProducts, setPageProducts]=useState([]);
  
  let location=useLocation() 
 let categorieRoute=location.pathname.split('/')[1]

useEffect(()=>{  
    let pageProducts=products.filter((product)=>product.categorie===categorieRoute);    
  setPageProducts(pageProducts)
},[products])


  return (
    <div>
      { pageProducts.map((product) => {
        return <Product key={product._id} data={product} />;
      })}
      
    </div>
  );
}
