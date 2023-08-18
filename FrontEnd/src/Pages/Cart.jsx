import { useContext, useState, useEffect } from "react";
import { Context } from "../Components/Context.jsx";
import { StatusCode } from '../utils/StatusCode'; 
// import { products } from "../Products";
export default function () {
  const {  cart, isLoggedIn, isLoading, setCart, setCartModified } = useContext(Context);

  const prixTotal = () => {
    var prixtotal = 0;
    let carteItems=cart.items;
    for (let item of carteItems) {
      let price = item.productId.price_U;
      prixtotal += price * item.quantity;
    }
    return prixtotal;
  };

  //FIX
  const deleteItems = (id) => {      
    let cartcopy = {...cart};
    cartcopy.items= cartcopy.items.filter((item)=>item.productId._id!==id);
    setCart(cartcopy)
    setCartModified(true);
  };

  if(isLoading) return;
  if(!isLoggedIn) return <>Please login First</>
  if(!cart.items) return;
  return (
    <div>
    {
       cart.items.map((item) => {
        return (          
            <pre>
              <img
                src={item.image}
                width={250}
                height={200}
              />
              {item.productId.title}: {item.quantity}{" "}
              <button
                className="deleteItems"
                onClick={() => deleteItems(item.productId._id)}
              >
                X
              </button>
            </pre>          
        );
      })
    }
      <p> Total Price: {prixTotal()}$</p>
    </div>
  );
}
