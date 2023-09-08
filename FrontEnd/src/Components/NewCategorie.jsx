import { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import CustomeFileInput from './CustomeFileInput';
import axios from 'axios'
import {Context} from './Context'
export default function(){
    const {types, setTypes} = useContext(Context)
    const [open, setOpen] = useState(false)
    const [categorie, setCategorie] = useState('');
    const [file, setFile]=useState();
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
              
            const formData=new FormData();
            formData.append('file', file);
            // formData.append('categorie',JSON.stringify(product))
            formData.append('title', categorie)
           try{
             
             const headers= {
               'Content-Type': 'multipart/form-data',
               withCredentials:true
            }
              await axios.post('http://localhost:5000/categories',formData, headers)             
              
              setOpen(false)
              
            }catch(e){
             console.log("Error:",e.message)
             
           }      
        }


    return (
        <>
        <Fab
          color="warning"
          aria-label="add"
          style={{ position: "fixed", bottom: "1rem", right: "5rem" }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>  



        <Dialog open={open} onClose={handleClose}>    
        
    <DialogTitle>Add new Categorie</DialogTitle>    
    <DialogContent>
    <form onSubmit={handleSubmit}>
        <label htmlFor="categorie">New Categorie*:</label><br/>        
        <input id="categorie" type="text" onChange={(e)=>setCategorie(e.target.value)}/>  
        <br/>
        <CustomeFileInput text="Choose categorie image" onChange={handleImgChange}/>
        <br/>
        <input style={{ color: 'green', marginRight: '10px' }} type="submit" value="Submit"/>
        <input value="Close" style={{ color: 'red' }} onClick={handleClose} type='button' />
        
</form>

    </DialogContent>    
  </Dialog>
        </>
    )
}