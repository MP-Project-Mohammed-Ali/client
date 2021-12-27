import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav/index"
import Register from "./component/Register";

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
 