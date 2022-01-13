import React, { useEffect, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Nav from "../Nav";
import "./style.css";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Input,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const state = useSelector((state) => {
    return {
      token: state.signIn.token,
    };
  });

  const signUp = async () => {
    try {
      setMessage("");
      const result = await axios.post(`${BASE_URL}/singup`, {
        name: name,
        email: email,
        password: password,
      });
      
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Active Your Account",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Already Registed",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <>
    <Nav navb={true}/>
    <div>
      <div className="bigwrapper">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="singup">
            <form>
              <label className="SingupLabel" htmlFor="chk" aria-hidden="true">
                {" "}
                تسجيل جديد{" "}
              </label>
              <input
              className="inputform"
                type="text"
                placeholder="من فضلك ادخل الاسم"
                width="80%"
                height="2rem"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
              className="inputform"
                type="text"
                placeholder="من فضلك ادخل الايميل"
                width="80%"
                height="2rem"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
              className="inputform"
                type="password"
                placeholder="من فضلك ادخل كلمة المرور"
                width="80%"
                height="2rem"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                id="signupSubmitButton"
                onClick={(e) => {
                  e.preventDefault();
                  signUp(e);
                }}
              >
                تسجيل جديد
              </button>
            </form>
          </div>

          <div className="login">
            <form onClick={() => navigate("/login")}>
              <label
                className="LoginLable"
                htmlFor="chk"
                aria-hidden="true"
                a
                target="_blank"
                href="locall"
              >
                تسجيل دخول
              </label>
              <input
              className="inputform"
                bg="#222"
                color="white"
                textAlign="center"
                type="email"
                width="40"
                placeholder="من فضلك ادخل الايميل"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
              className="inputform"
                bg="#222"
                color="white"
                textAlign="center"
                type="password"
                width="40"
                placeholder="من فضلك ادخل كلمة المرور"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button id="signupSubmitButton">Login</button>
              <br />
              <Link exact href="/check">
                استعادة كلمة المرور
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
