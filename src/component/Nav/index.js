import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout1 } from "../../Reducers/login";

const Nav = ({ navb }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const [nav, setNav] = useState(navb);

  const state = useSelector((state) => {
    return state;
  });
  const logout = () => {
    dispatch(logout1({ role: "", token: "" }));
    localStorage.clear();
    navigate("/");
  };
  const changeColor = () => {
    if (window.scrollY > 600) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  return (
   
    <div
      className={!navb ? (nav ? "wrapper color" : "wrapper ") : "wrapper color"}
    >
      
      <div className="navMenu">
        <img id="logo" src="/imag/logo2.png" alt="#" />
        <NavLink to="/" className="links">
          الصفحة الرئيسية
        </NavLink>
        {state.signIn.token && (
          <NavLink to={`/profile/${state.signIn.id}`} className="links">
             القضايا
          </NavLink>
        )}
        <NavLink to="/show" className="links">
           المحامين
        </NavLink>
      
     {state?.signIn?.role==ROLE?(
       <NavLink to="/list" className="links">
        طلبات الاستشارة
             </NavLink>
     ):<></>}
     </div>
      <div className="Loginhome">
        {!state.signIn.token && (
          <>
            <NavLink to="/regist" className="loginlinks">
              تسجيل جديد{" "}
            </NavLink>
            <NavLink to="/login" className="loginlinks">
              تسجيل دخول
            </NavLink>
          </>
        )}
        {state.signIn.token && (
          <NavLink to="/" onClick={logout} className="loginlinks">
            تسجيل خروج
          </NavLink>
        )}
      </div>
    </div>
  
  );
};
export default Nav;
