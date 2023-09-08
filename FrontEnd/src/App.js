import { ContextProvider } from "./Components/Context";
import './App.css'
import Routing from './Routing'
// import {Fab} from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add";
function App() {  
  return (
    <div className="App">
      <ContextProvider>
          <Routing/>     
      </ContextProvider>     
    </div>
  );
}

export default App;
