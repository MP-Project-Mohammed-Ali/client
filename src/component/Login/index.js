import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login1 } from "../../Reducers/login";
import { useNavigate } from "react-router";
import PasswordChecklist from "react-password-checklist";
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
  HStack,
  Input,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import Nav from "../Nav";
const MySwal = withReactContent(Swal);

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE = process.env.REACT_APP_LAWYER_ROLE;
// const USER_LAWYER=process.env.REACT_APP_USER_ROLE

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [local, setLocal] = useState("");
  const state = useSelector((state) => {
    return { token: state.signIn.token };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLocal(token);
  }, []);
  const logIn = async () => {
    try {
      const result1 = await axios.post(`${BASE_URL}/login/new`, {
        email,
        password,
      });
      // const role=result1.data.result.role
      dispatch(
        login1({
          role: result1.data.result.role,
          token: result1.data.token,
          id: result1.data.result._id,
        })
      );
      if (result1.data.result.role== "61c80a2efa23f676528d6258") {
        navigate("/list");
      } else {
        navigate("/show");
      }
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم تسجيل الدخول",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "خطأ في الإيميل أو كلمة المرور",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <>
    <Nav navb={true}/>
    <div className="bigwrapper">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="singup">
          <form onClick={() => navigate("/regist")}>
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
            <button id="signupSubmitButton" onClick={(e) => {}}>
              تسجيل جديد
            </button>
            {/* <PasswordChecklist
              id="checklist"
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={6}
              value={password}
              onChange={(isValid) => {
                if (isValid) {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = false;
                } else {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = true;
                }
              }}
            /> */}
          </form>
        </div>

        <div className="login">
          <form>
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
            <button
              id="signupSubmitButton"
              onClick={(e) => {
                e.preventDefault();
                logIn(e);
              }}
            >
              تسجيل دخول
            </button>
            <br />
            <a  href="/check" id="link">
              استعادة كلمة المرور
            </a>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
