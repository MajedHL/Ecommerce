import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { useReducer, useRef, useContext, useState } from 'react';
import {Context} from './Context';
import CustomeFileInput from './CustomeFileInput';
import Notification from './Notification'
import './Styles/Global.css'
import axios from 'axios'
import { useEffect } from 'react';

const ACTIONS={
  SETPRODUCTTITLE:"setProductTitle",
  SETPRODUCTPRICE:"setProductPrice",
  SETPRODUCTSTOCK:"setProductStock",
  SETPRODUCTCATEGORIE:"setProductCategorie",
  }
const reducer=(state,action)=>{
  switch(action.type){

    case ACTIONS.SETPRODUCTTITLE:   
      return {...state,productTitle:action.payload};
    break;

    case ACTIONS.SETPRODUCTPRICE:
      return {...state,productPrice:action.payload};
    break;

    case ACTIONS.SETPRODUCTSTOCK:
      return {...state,productStock:action.payload};
    break;

    case ACTIONS.SETPRODUCTCATEGORIE:    
      return {...state,productCategorie:action.payload};
    break;

    

    default:      
      return {productTitle:"",productPrice:0,productStock:0,productCategorie:{}};
    break;
  }
}
export default function(){  

    const {products, categories}=useContext(Context)    
    const [open, setOpen] = useState(false);
    const [showProductForm,setshowProductForm]=useState(false);    
    const [state,dispatch]=useReducer(reducer,{productTitle:"",productPrice:0,productStock:0,productCategorie:""})
    const [file, setFile]=useState();
    const [url,setUrl]=useState();
    const [isAdmin, setIsAdmin] = useState(false)    
    const notifRef=useRef()
    

    const handleOpen = () => {
    setOpen(true);
    };
  
    const handleClose = () => {
    setOpen(false);
     };

     const handleImgChange=(e)=>{
        setFile(e.target.files[0]);
     }


     const handleSubmit=async (event)=>{
      event.preventDefault();
      if(false) {
        notifRef.current.click()
        return;     
      }    
           
      const {productTitle,productPrice,productStock,productCategorie}=state;      
      const product={productTitle,productPrice,productStock,productCategorie};    
      
      const options={
        method:"POST",
        headers:{
          "Content-Type":"application/json",
      },
        body:JSON.stringify(product),
      };    


      const formData=new FormData();
      formData.append('file',file);
      formData.append('product',JSON.stringify(product))
     try{
        // await fetch('http://localhost:5000/products',{
        //   method:"POST",
        //   body:formData
        // });
       const headers= {
         'Content-Type': 'multipart/form-data',
         withCredentials:true
      }
        await axios.post('http://localhost:5000/products',formData, headers)
        dispatch({type:"def"})
        setOpen(false)
        notifRef.current.click()
      }catch(e){
       console.log("Error:",e.message)
       notifRef.current.click()
     }      
  }
      


     

    const Notif=()=>{
     let notifProps={};
      if(isAdmin) {
        notifProps={type:'success',message:'Product was sent successfully !'}
     }else{
        notifProps={type:'error',message:'error !'}
     }
     
      return <Notification ref={notifRef} {...notifProps} /> ; 
    }
    
 
 

return (<> 
  {/* {isAdmin && Notif()} */}
 { Notif()}
  <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>    
        <Dialog open={open} onClose={handleClose}>    
        
    <DialogTitle>Add new Product</DialogTitle>    
    <DialogContent>
    <form onSubmit={handleSubmit}>
  
  {products && (
    <div>
      <h4>Add a product</h4>
      <label htmlFor="productTitle">Title*:</label><br/>
      <input id="productTitle" type="text" placeholder="banana, apple, ..." required onChange={(e)=>dispatch({type:ACTIONS.SETPRODUCTTITLE,payload:e.target.value})}/><br/>
      <label htmlFor="productPrice">Price per unit*:</label><br/>
      <input id="productPrice" type="number" step="any" placeholder="20$..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETPRODUCTPRICE,payload:e.target.value})}/><br/>
      <label htmlFor="productStock">Stock*:</label><br/>
      <input id="productStock" type="number" placeholder="200..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETPRODUCTSTOCK,payload:e.target.value})}/><br/>
      
      <label htmlFor='types'>Categorie*:</label>
      <br/>
    {categories &&<select id="types" required onChange={(e)=>dispatch({type:ACTIONS.SETPRODUCTCATEGORIE,payload:e.target.value})}>
    <option value="" hidden>None</option>
      {categories.flatMap((categorie)=>{
        return ([<option key={categorie._id} value={categorie.title}>{categorie.title}</option>,<option disabled>----------</option>])
      })}
        
    </select>  } 
    

    <CustomeFileInput text="Choose product image" onChange={handleImgChange}/>
    </div>
  )}
  <br/><br/>
  <input style={{ color: 'green', marginRight: '10px' }} type="submit" value="Submit"/>
  <input value="Close" style={{ color: 'red' }} onClick={handleClose} type='button' />
   {/* <button style={{ color: 'green', marginRight: '40px' }} type="submit" >Submit</button>
  <button  style={{ color: 'red',width:'65px' }} onClick={handleClose}  >Close</button> */}
</form>
{url && <img src={url} alt='img goes here' height={100} width={100}/>}
    </DialogContent>    
  </Dialog>
  </>
  )
  
}

