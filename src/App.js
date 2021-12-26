import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav/index"
import Register from "./Register";

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
 