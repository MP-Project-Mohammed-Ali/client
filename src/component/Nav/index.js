import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout1 } from "../../Reducers/login";


const Nav = ({navb}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav, setNav] = useState(navb);

  const state = useSelector((state) => {
    return state;
  });
  console.log(state);
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
    <div className={!navb ? nav ? "wrapper color" : "wrapper ":"wrapper color"}>
      {/* <NavLink to="/" className="links"> */}
      <div className="navMenu">
      <img id="logo" src="/imag/logo2.png" alt="#" />
      {/* </NavLink> */}
      
        <NavLink to="/" className="links">
          الصفحة الرئيسية
        </NavLink>
        {state.signIn.token && (
          <NavLink to={`/profile/${state.signIn.id}`} className="links">
            الملف الشخصي
          </NavLink>
        )}
        <NavLink to="/show" className="links">
          قائمة المحامين
        </NavLink>
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
