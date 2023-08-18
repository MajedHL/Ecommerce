import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./Components/Context";
import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart.jsx";
import Fruits from "./Pages/Fruits.jsx";
import Shop from "./Pages/Shop.jsx";
import Vegies from "./Pages/Vegies.jsx";
import './App.css'
import Dialog from "./Components/AddDialog";
import ProductInfo from "./Pages/ProductInfo";
import UserInfo from "./Pages/UserInfo";

// import {Fab} from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add";
function App() {
  
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <NavBar />          
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Fruits" element={<Fruits />} />
            <Route path="/Vegies" element={<Vegies />} />
            <Route path="/Profile" element={<UserInfo />} />
            <Route path="/Fruits/:id" element={<ProductInfo />} />
            <Route path="/Vegies/:id" element={<ProductInfo />} />
          </Routes>
        
          <Dialog  />
        </Router>        
      </ContextProvider>     
    </div>
  );
}

export default App;
