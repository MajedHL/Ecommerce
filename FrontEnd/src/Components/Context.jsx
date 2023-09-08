  import { createContext, useEffect, useState, useRef } from "react"; 
  import axios from 'axios';
  import { StatusCode } from "../utils/StatusCode";
  export const Context = createContext(null);
 

 

  async function GetProducts(){
    let response =await axios.get('http://localhost:5000/products', { withCredentials: true })    
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


  async function GetCategories(){
    let response = await axios.get('http://localhost:5000/categories/all', { withCredentials: true })
    return response.data;
  }








  export const ContextProvider = (props) => {
    //state
    

    const [carteItems, setcarteItems] = useState([]);
    const [products,setProducts]=useState([])
    const [vegies, setVegies]=useState([])
    const [cart, setCart]=useState({});       
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartModified, setCartModified]=useState(false);
    const [isLoading, setIsLoading]=useState(true);
    const [categories, setCategories] = useState([]);

  useEffect( ()=>{
    const callGet=async()=>{
      let products=  await GetProducts();
      setProducts(products);   
    }
    callGet();  
  },[])

  useEffect( ()=>{
    const callGet=async()=>{
      let categories=  await GetCategories();      
      setCategories(categories);   
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
        cart.items.forEach((item)=>{
        let product=products.find((product)=>product._id===item.productId._id);                
        item['image']=product.image        
        })        
        setCart(cart);

      }catch(e){
        console.log("error:",e)        
      }
      
    }
    if(isLoggedIn && products.length>0) callGet();  

  },[isLoggedIn])







const PutCart=()=>{
  const options={
    headers:{'Content-Type':'application/json'},
    withCredentials:true,
  }  
  if(cart._id) axios.put(`http://localhost:5000/carts/${cart._id}`, JSON.stringify(cart) , options)
}
//whenever Cart is modified on the front, we send the new Cart to the db
useEffect(()=>{ 
  if(cart && cart.items && cartModified ){    
    PutCart()
    setCartModified(false);
  }
},[cartModified])





  
 





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
      if(!nb || !cart) return;      
      let cartcopy = {...cart};     
      let item=cartcopy.items.find((item)=>item.productId._id===product._id)      
      if(item) item.quantity+=parseFloat(nb); 
      else {
        cartcopy.items.push({productId:{_id, title,price_U},quantity:parseFloat(nb),image:image})
      }  
      setCart(cartcopy)    
      setCartModified(true);
      
      return;
    };








    
    const contextvalue = { addItems, products, cart, setIsLoggedIn, isLoggedIn, isLoading, setCart, setCartModified, categories, setCategories };
    return (
      <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
    );
  };
