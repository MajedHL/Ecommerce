
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useImperativeHandle, forwardRef, useContext } from "react";
import axios from 'axios';
import {Context} from './Context.jsx'

 const App= forwardRef((props,ref)=>{

    const [open, setOpen]=useState(false);
    const [userName, setuserName]=useState();
    const [password, setPassword]=useState();
    const [email, setEmail]=useState();
    const [badInfo, setBadInfo]=useState(false)
    const {isLoggedIn,setIsLoggedIn}=useContext(Context);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data={userName:userName,email:email, password:password}      
             
        const headers={
            'Content-Type':'application/json',
        }
        
        
     try{
        await axios.post('http://localhost:5000/auth/signUp', data, { withCredentials: true, headers:headers })         
        setBadInfo(false);
        setOpen(!open)
        setIsLoggedIn(!isLoggedIn);
        
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
                <DialogTitle>Sign Up</DialogTitle>                
                <DialogContent>
                {badInfo && (<label style={{color:"red"}}>userName or email already exist!</label>)}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">userName:</label> <br/>
                        <input id='userName' type='text' onChange={(e)=>setuserName(e.target.value)}/>
                        <br/><br/>
                        <label htmlFor="email">email:</label> <br/>
                        <input id='email' type='text' onChange={(e)=>setEmail(e.target.value)}/>
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