
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";

function App() {
  // const { user } = useContext(AuthContext);
  return (
    
    //  <div> <Messenger/> </div>
    <div>
    <Login/>
    <Register/>
    </div>
  );
}

export default App;
