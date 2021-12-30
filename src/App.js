import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav/index"
import Register from "./component/Register";
import Login from "./component/Login";
import CheckEmail from "./component/CheckEmail";
import ResetPassword from "./component/ResetPassword";
import Active from "./component/Active"
import Lawyer from "./component/Lawyer"
import Cases from "./component/Cases"
import Profile from "./component/Profile";

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/regist" element={<Register/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/check" element={<CheckEmail />} />
        <Route exact path="/reset/:id" element={<ResetPassword />} />
        <Route exact path="/active/:id" element={<Active />} />
        <Route exact path="/show" element={<Lawyer/>}/>
        <Route exact path="/cases/:id" element={<Cases/>}/>
        <Route exact path="/profile" element={<Profile/>}/>

        
      </Routes>
    </>
  );
}

export default App;
 


