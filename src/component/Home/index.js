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
    //   <>
    // <div className="HomePage">
    //     <div className="headerimg">
        
      
    //     </div>
    // </div>
    // </>
    <>
    <Nav/>
    
    <div className = "head-text">
      <div className = "head-image">
      <img
          id="backgroundimg"
          src="https://whatsnewinpublishing.com/wp-content/uploads/2019/10/Social_media_icons.jpg" alt="#"
        /> 
    
      </div>
        <div class='text-on-image'>
        <h1 > Welcome To Social Media </h1>
        <button  className="buttonHome" onClick={login} > Login </button>
      <button  className="buttonHome" onClick={register} > Register </button>
      
        </div>
    </div>
    </>
  );
}

export default Home;





