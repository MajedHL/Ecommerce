import { useContext, useState, useEffect } from "react";
import { Context } from "../Components/Context.jsx";
import axios from 'axios';
export default function(){
    const {  isLoggedIn, isLoading } = useContext(Context);
    const [user, setUser]=useState({});
    useEffect(()=>{
        const GetUser=async()=>{                       
           try{
            const user=await axios.get('http://localhost:5000/users', { withCredentials: true }) 
            setUser(user.data)               
           }catch(e){
               console.log(e.message)
           } 
        }
        if(isLoggedIn)  GetUser()
      },[isLoggedIn])
    
    if(isLoading) return;
    if(!isLoggedIn) return <>Please login First</>   

const objectkeys=Object.keys(user)

   return(<>
   {objectkeys.map((key)=>{
       return <p>{key} : {user[key]}</p>
   })}
   </>)
}