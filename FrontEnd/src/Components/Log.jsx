
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useImperativeHandle, forwardRef, useContext } from "react";
import axios from 'axios';
import {Context} from '../Components/Context.jsx'

 const App= forwardRef((props,ref)=>{

    const [open, setOpen]=useState(false);
    const [userName, setuserName]=useState();
    const [password, setPassword]=useState();
    const [badInfo, setBadInfo]=useState(false)
    const {isLoggedIn,setIsLoggedIn}=useContext(Context);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data={userName:userName, password:password}      
             
        const headers={
            'Content-Type':'application/json',
        }
        
        
     try{
        await axios.post('http://localhost:5000/auth/login', data, { withCredentials: true, headers:headers }) 
        setIsLoggedIn(!isLoggedIn);
        setBadInfo(false);
        setOpen(!open)
        

     }catch(e){        
         if(e.response.status>=400) {
            setBadInfo(true);        
            return
        }
     }  
       
      
       
    }
    
    
    
    const handleClose=()=>{
        setOpen(false);
        setBadInfo(false);
    }
    useImperativeHandle(ref, () => ({
        setOpen,
      }));
    
    
    return(
        <div>
        {/* <button ref={ref} onClick={handleOpen} hidden></button> */}
            <Dialog open={open} >
                <DialogTitle>Log in</DialogTitle>                
                <DialogContent>
                {badInfo && (<label style={{color:"red"}}>Invalid userName or password!</label>)}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">userName:</label> <br/>
                        <input id='userName' type='text' onChange={(e)=>setuserName(e.target.value)}/>
                        <br/><br/>
                        <label htmlFor="password">password:</label> <br/>
                        <input id='password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
                        <br/><br/>
                        <button style={{ color: 'green', marginRight: '40px' }} type="submit" >Ok</button>
                        <button  style={{ color: 'red',width:'65px' }} onClick={handleClose} type="reset" >Cancel</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        );
    
    })
    export default App;