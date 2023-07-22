import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { useReducer, useRef, useContext, useState } from 'react';
import {Context} from './Context';
import CustomeFileInput from './CustomeFileInput';
import Notification from './Notification'
import './Styles/Global.css'
// import {Button} from 'react-bootstrap'

const ACTIONS={
  SETFRUITTITLE:"setFruitTitle",
  SETFRUITPRICE:"setFruitPrice",
  SETFRUITSTOCK:"setFruitStock",
  SETVEGTITLE:"setVegTitle",
  SETVEGPRICE:"setVegPrice",
  SETVEGSTOCK:"setVegStock"
  
}
const reducer=(state,action)=>{
  switch(action.type){

    case ACTIONS.SETFRUITTITLE:     
    return {...state,fruitTitle:action.payload};
    break;

    case ACTIONS.SETFRUITPRICE:
      return {...state,fruitPrice:action.payload};
    break;

    case ACTIONS.SETFRUITSTOCK:
      return {...state,fruitStock:action.payload};
    break;

    case ACTIONS.SETVEGTITLE:
      return {...state,vegTitle:action.payload};
    break;

    case ACTIONS.SETVEGPRICE:
      return {...state,vegPrice:action.payload};
    break;

    case ACTIONS.SETVEGSTOCK:
      return {...state,vegStock:action.payload};
    break;

    default:      
      return {fruitTitle:"",fruitPrice:0,fruitStock:0,vegTitle:"",vegPrice:0,vegStock:0};
    break;
  }
}
export default function(props){  

    const {fruits}=useContext(Context)
    const [open, setOpen] = useState(false);
    const [showFruitForm,setshowFruitForm]=useState(false);
    const [showVegForm,setshowVegForm]=useState(false);
    const [state,dispatch]=useReducer(reducer,{fruitTitle:"",fruitPrice:0,fruitStock:0,vegTitle:"",vegPrice:0,vegStock:0})
    const [file,setFile]=useState();
    const [url,setUrl]=useState();
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
      
      console.log(state)
      
      const {fruitTitle,fruitPrice,fruitStock,vegTitle,vegPrice,vegStock}=state;
      const fruit={fruitTitle,fruitPrice,fruitStock};
      const  veg={vegTitle,vegPrice,vegStock}
      console.log("fruit:"+JSON.stringify(fruit))
      const options={
        method:"POST",
        headers:{
          "Content-Type":"application/json",
      },
        body:JSON.stringify(fruit),
      };
     //if(fruitTitle) await fetch('http://localhost:5000/fruits',options);


      const formData=new FormData();
      formData.append('file',file);
      formData.append('fruit',JSON.stringify(fruit))
      await fetch('http://localhost:5000/fruits',{
        method:"POST",
        body:formData
      });


      dispatch({type:"def"})
      setOpen(false)
     }


   
    


     const handleFruitClick=(event)=>{
       setshowFruitForm(!showFruitForm)
       event.preventDefault();       
     }
    
    
  


     const handleVegClick=(event)=>{
      setshowVegForm(!showVegForm)
      event.preventDefault();       
    }

 

return (<> 
  
  <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>    
        <Dialog open={open} onClose={handleClose}>
        <Notification ref={notifRef} {...{type:'info',message:'Good !'}} />
    <DialogTitle>Add new</DialogTitle>    
    <DialogContent>
    <form onSubmit={handleSubmit}>
  <button onClick={handleFruitClick}>Add Fruit</button>
  {showFruitForm && (
    <div>
      <h4>Add a fruit</h4>
      <label htmlFor="fruitTitle">Title*:</label><br/>
      <input id="fruitTitle" type="text" placeholder="banana, apple, ..." required onChange={(e)=>dispatch({type:ACTIONS.SETFRUITTITLE,payload:e.target.value})}/><br/>
      <label htmlFor="fruitPrice">Price per unit*:</label><br/>
      <input id="fruitPrice" type="number" step="any" placeholder="20$..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETFRUITPRICE,payload:e.target.value})}/><br/>
      <label htmlFor="fruitStock">Stock*:</label><br/>
      <input id="fruitStock" type="number" placeholder="200..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETFRUITSTOCK,payload:e.target.value})}/><br/>
    <CustomeFileInput text="Choose fruit image" onChange={handleImgChange}/>
    </div>
  )}

  <br/><br/>

  <button onClick={handleVegClick}>Add Veg</button>
  {showVegForm && (
    <div>
      <h4>Add a Veg</h4>
      <label htmlFor="vegTitle">Title:</label><br/>
      <input id="vegTitle" type="text" placeholder="cucumber, lettuce, ..." required onChange={(e)=>dispatch({type:ACTIONS.SETVEGTITLE,payload:e.target.value})}/><br/>
      <label htmlFor="vegPrice">Price per unit:</label><br/>
      <input id="vegPrice" type="number" placeholder="20$..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETVEGPRICE,payload:e.target.value})}/><br/>
      <label htmlFor="vegStock">Stock:</label><br/>
      <input id="vegStock" type="number" placeholder="200..." min={0} required onChange={(e)=>dispatch({type:ACTIONS.SETVEGSTOCK,payload:e.target.value})}/><br/>
    </div>
  )}


<br/>

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

