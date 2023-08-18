  import { createContext, useEffect, useState, useRef } from "react";
  import { fruits } from "../Fruits";
  import { vegies } from "../Vegies";
  import axios from 'axios';
  import { StatusCode } from "../utils/StatusCode";
  export const Context = createContext(null);
 

 

  async function GetFruits(){
    let response =await axios.get('http://localhost:5000/fruits', { withCredentials: true })    
    return response.data;
  }


  async function GetCart(){  
      // try{
        let response =await axios.get('http://localhost:5000/carts', { withCredentials: true })  
        console.log("cart from context:",response.data)
        return response.data;  
      // }catch(e){
      // return e.response.status
      // }
          
  }








  export const ContextProvider = (props) => {
    //state
    

    const [carteItems, setcarteItems] = useState([]);
    const [fruits,setFruits]=useState([])
    const [vegies, setVegies]=useState([])
    const [cart, setCart]=useState({});
    const [products, setProducts]=useState([]);    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartModified, setCartModified]=useState(false);
    const [isLoading, setIsLoading]=useState(true);
    

  useEffect( ()=>{
    const callGet=async()=>{
      let fruits=  await GetFruits();
      setFruits(fruits);   
    }
    callGet();  
  },[])

  useEffect(()=>{
    const callGet=async()=>{
      try{
        //this is actually just to veriy if a user is still logged in, it has nothing to do with fetching data 
        await GetCart();    
        setIsLoggedIn(true)
        setIsLoading(false)
      }catch(e){
        console.log("error:",e)
        if(e.response.status===StatusCode.UNAUTHORIZED) {
          setIsLoading(false);
          setIsLoggedIn(false);
        }
      }
    }
    callGet();
  },[isLoggedIn])

  useEffect(()=>{
    const callGet=async()=>{
      try{
        //will throw a error if UNAUTHORIZED (not logged in)
        let cart = await GetCart();
        console.log('fetched cart:',cart)
        cart.items.forEach((item)=>{
        let fruit=fruits.find((fruit)=>fruit._id===item.productId._id);                 
        console.log("image:",item['image'])
        item['image']=fruit.image        
        })        
        setCart(cart);

      }catch(e){
        console.log("error:",e)        
      }
      
    }
    if(isLoggedIn && fruits.length>0) callGet();  

  },[isLoggedIn])







const PutCart=()=>{
  const options={
    headers:{'Content-Type':'application/json'},
    withCredentials:true,
  }  
  if(cart._id) console.log("put");axios.put(`http://localhost:5000/carts/${cart._id}`, JSON.stringify(cart) , options)
}

useEffect(()=>{ 
  if(cart && cart.items && cartModified ){    
    PutCart()
    setCartModified(false);
  }
},[cartModified])



  useEffect(()=>{
  setProducts(fruits.concat(vegies))
  },[fruits,vegies])

  //whenever Cart is modified on the front, we send the new Cart to the db
 





    // populated items=> {
    //_id: mongoose ids  
    //title:String//
  // price_U:Number,
  // stocks:Number,
  // ref:String

  //quantity:number
  //+ images added on the front
    const addItems = (product, nb) => {
      const {_id, title,price_U, image } = product;
      console.log("add items")
      if(!nb) return
      if(!cart) return;
      let cartcopy = {...cart};
      let item=cartcopy.items.find((productId)=>productId._id===product._id)
      if(item) item.quantity+=parseFloat(nb); 
      else {
        cartcopy.items.push({productId:{_id, title,price_U},quantity:nb,image:image})
      }  
      setCart(cartcopy)    
      setCartModified(true);
      console.log("cartcopy:",cartcopy)
      return;
    };








    
    const contextvalue = { addItems, fruits, cart, setIsLoggedIn, isLoggedIn, isLoading, setCart, setCartModified };
    return (
      <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
    );
  };
