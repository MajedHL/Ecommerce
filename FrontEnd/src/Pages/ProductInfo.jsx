import { useParams } from "react-router-dom";
import { Context } from "../Components/Context";
import { useState, useEffect, useContext } from "react";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent, Button  } from '@material-ui/core';
import EditDialog from "../Components/EditDialog";

export default function(){
const[product, setProduct]=useState();
const [open, setOpen] = useState(false);


let {id}=useParams();
let {fruits, RefreshFruits}=useContext(Context); 

 useEffect(() => {    
    const prod = fruits.find((fruit) => fruit._id === id);
    setProduct(prod);   
  }, [fruits, id]);


  const deletProduct= async ()=>{
   setOpen(false);  
   const options={
        method:'DELETE',
        headers:{"Content-Type":"application/json",},
     }

    let resp= await fetch(`http://localhost:5000/fruits/${product._id}`,options)    
     RefreshFruits();
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