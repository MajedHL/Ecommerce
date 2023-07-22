import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App=forwardRef((props,ref)=> {  
    
    const message=props.message;
    const notifType=props.type; 
    const options={
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,         
        closeOnClick: true, 
        pauseOnHover: false,            
    };
     const showToastMessage = () => {
        console.log('in showToastMessage ')
        switch(notifType){
    
           case 'success': toast.success(message, options);
           break;
    
           case 'warning':toast.warning(message, options);
           break;
    
           case 'error':toast.error(message, options);
           break;
    
           case 'info':toast.info(message, options);
           break;
    
           default: toast(message, options);
           break;
        }       
        
    };      

   

    return (
        <div>                      
            <button ref={ref} onClick={showToastMessage} hidden></button>
            {/* <button ref={ref} onClick={showToastMessage} >Hola</button> */}
            <ToastContainer />
        </div>
    );
})
 export default App;