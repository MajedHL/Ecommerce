import {Context} from './Components/Context'
import {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dialog from "./Components/AddDialog";
import CategorieDialog from "./Components/NewCategorie"
import ProductInfo from "./Pages/ProductInfo";
import UserInfo from "./Pages/UserInfo";
import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart.jsx";
import Shop from "./Pages/Shop.jsx";
import ProductsPage from './Pages/ProductsPage'

export default function(){

    const {categories}=useContext(Context);    
    const [routes, setRoutes]=useState([])
   
    
const routesBuilder=()=>{
  
  if(!categories || categories.size<=0) return  
  const routes = categories.flatMap((categorie) => (
      [{
      path: `/${categorie.title}`,
      element: <ProductsPage />, 
      image:categorie.image    
    },
    {
      path: `/${categorie.title}/:id`,
      element: <ProductInfo />,
    }]
  ));  
  setRoutes(routes)
}

useEffect(()=>{
  routesBuilder() 
},[categories])

    return (<>
    <Router>
          <NavBar />          
          <Routes>
            <Route path="/" element={<Shop routes={routes}/>} />
            <Route path="/Cart" element={<Cart />} />
            {/* <Route path="/Fruits" element={<Fruits />} />
            <Route path="/Vegies" element={<Vegies />} />
            <Route path="/Profile" element={<UserInfo />} />
            <Route path="/Fruits/:id" element={<ProductInfo />} />
            <Route path="/Vegies/:id" element={<ProductInfo />} />           */}
             {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        <Route path="/Profile" element={<UserInfo />} />
          </Routes>        
          <Dialog />
          <CategorieDialog/>
        </Router> 
    </>)
}