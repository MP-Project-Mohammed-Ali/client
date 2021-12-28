import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav/index"
import Register from "./component/Register";
import Login from "./component/Login";
import Forgect from "./component/Forgect"

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/regist" element={<Register/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/check" element={<Forgect />} />
      </Routes>
    </>
  );
}

export default App;
 


