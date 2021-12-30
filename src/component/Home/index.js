import React from "react";
// import "./style.css"
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";


function Home() {
  const Navigate = useNavigate();

  const register = () => {
    Navigate("/regist");
  };

  const login = () => {
    Navigate("/login");

    
  };
  return (
    <>
    <Nav/>
    <div className = "head-text">
      <div className = "head-image">
      
    
      </div>
        <div class='text-on-image'>
        <h1 > LegalAdvice </h1>
        <button  className="buttonHome" onClick={login} > Login </button>
      <button  className="buttonHome" onClick={register} > Register </button>
        </div>
    </div>
    </>
  );
}

export default Home;





