import React from "react";
import "./style.css";
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
      <div className="homepagewraper">
        <h1 className="home-title">
          <span>مرحبا بك في موقع للاستشارات القانونية </span>
          <span>من فضلك قم بتسجيل الدخول </span>
        </h1>
        <div className="head-text">
          <div className="head-image"></div>
          <div class="text-on-image">
            <button id="homeSubmitButton" onClick={login}>
              {" "}
              Login{" "}
            </button>
            <button id="homeSubmitButton" onClick={register}>
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
