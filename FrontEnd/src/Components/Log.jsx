
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useImperativeHandle, forwardRef } from "react";
 const App= forwardRef((props,ref)=>{

    const [open, setOpen]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    
    
    
    const handleClose=()=>{
        setOpen(false);
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
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login">login:</label> <br/>
                        <input id='login' type='text'/>
                        <br/><br/>
                        <label htmlFor="password">password:</label> <br/>
                        <input id='password' type='password'/>
                        <br/><br/>
                        <button style={{ color: 'green', marginRight: '40px' }} type="submit" >Ok</button>
                        <button  style={{ color: 'red',width:'65px' }} onClick={handleClose}  >Cancel</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        );
    
    })
    export default App;