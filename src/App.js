import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav/index"

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
 