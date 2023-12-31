import { useParams } from "react-router-dom";
import { Context } from "../Components/Context";
import { useState, useEffect, useContext } from "react";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent, Button  } from '@material-ui/core';
import EditDialog from "../Components/EditDialog";
import axios from 'axios'

export default function(){
const[product, setProduct]=useState();
const [open, setOpen] = useState(false);


let {id}=useParams();
let {products, RefreshProducts}=useContext(Context); 

 useEffect(() => {    
    const prod = products.find((product) => product._id === id);
    setProduct(prod);   
  }, [products, id]);


  const deletProduct= async ()=>{
   setOpen(false);  
   const options={
        withCredentials:true,
        headers:{"Content-Type":"application/json",},
     }

    let resp= await axios.delete(`http://localhost:5000/products/${product._id}`,options)    
     RefreshProducts();
  }
    
  

 return (
 <div>
 
 {product && (<>
    <img src={product.image} width={250} height={200}/>
    <p>Title:{product.title}</p>
    <p>id:{product._id}</p>
    <p>price:{product.price_U} $/kg</p>
    <p>stock:{product.stocks}</p>
    <div>
       <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red',marginRight:"10px",cursor:"pointer" }} onClick={()=>setOpen(true)} /> 
      <EditDialog />     
    </div>
  
 </>
 )}

 <Dialog open={open} onClose={()=>setOpen(false)}>
   <DialogContent>
      Are you sure you want to remove this product ?
      <br/><br/>
      <Button variant='contained' style={{marginRight:"45%"}} onClick={()=>setOpen(false)}>Cancel</Button>
      <Button variant='contained' style={{backgroundColor:"red", color:"white"}} onClick={deletProduct}>Delete</Button>
   </DialogContent>
 </Dialog>
 </div>);


}