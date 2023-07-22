import { createContext, useEffect, useState } from "react";
import { fruits } from "../Fruits";
import { vegies } from "../Vegies";

export const Context = createContext(null);
function defaultcarte() {
  var array = [];
  let length = fruits.length + vegies.length;

  for (let i = 1; i <= length; i++) {
    array.push({
      id: i,
      number: 0,
    });
  }
  return array;
}

async function GetFruits(){
 let response =await fetch('http://localhost:5000/fruits')
 let fruits= await response.json();
 return fruits;
}
//TOFIX send the ref over, (POST and NOT GET)
// const fetchImage = async () => {
  
//   console.log("in fetch image")
//   const resp = await fetch('http://localhost:5000/fruits/imgs');     
//   const url= await resp.text();   
//   return url
// };





export const ContextProvider = (props) => {
  //state
  const array = defaultcarte();

  const [carteItems, setcarteItems] = useState([]);
  const [fruits,setFruits]=useState([])
  //comporttements

  useEffect( ()=>{
   GetFruits().then(fruits=>setFruits(fruits)) 
  },[])

 const Refresh=()=>{
  GetFruits().then(fruits=>setFruits(fruits)) 
 }

  const addItems = (itemId, nb) => {
    let cartcopy = [...carteItems];
    cartcopy.map((item) => {
      if (item.id === itemId) item.number += parseFloat(nb);
    });
    setcarteItems(cartcopy);
  };
  const contextvalue = { carteItems, addItems, setcarteItems, fruits, Refresh };
  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};
