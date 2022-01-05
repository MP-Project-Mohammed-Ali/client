import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout1 } from "../../Reducers/login";
import logo from "../imag/logo.png"

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kick = () => {
    localStorage.clear();
    navigate("/SignUp");
  };

  const state = useSelector((state) => {
    return state;
  });
  console.log(state);
  const logout = () => {
    dispatch(logout1({ role: "", token: "" }));
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="wrapper">
         <NavLink to="/" className="links">
          <img id="logo" src={logo} alt="#" />
        </NavLink>
        <div className="navMenu">
          
          <NavLink to="/" className="links">
           الصفحة الرئيسية
          </NavLink>
          <NavLink to={`/profile/${state.signIn.id}`} className="links">
            الملف الشخصي
          </NavLink>
          <NavLink to="/show" className="links">
        قائمة المحامين
          </NavLink>

          <NavLink to="/login" className="links">
           
          </NavLink>
          <NavLink to="/list" className="links">
           
          </NavLink>
          <NavLink to="/" onClick={logout} className="loglinks">
          تسجيل خروج
          </NavLink>
          </div>
          </div>
  );
};
export default Nav;
