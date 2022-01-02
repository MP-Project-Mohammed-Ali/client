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
      if (result1.data.result.role== "61c80a2efa23f676528d6258") {
        navigate("/list");
      } else {
        navigate("/show");
      }
      dispatch(
        login1({
          role: result1.data.result.role,
          token: result1.data.token,
          id: result1.data.result._id,
        })
      ); 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "worng Email or password",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <div className="bigwrapper">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="singup">
          <form onClick={() => navigate("/regist")}>
            <label className="SingupLabel" htmlFor="chk" aria-hidden="true">
              {" "}
              Sing up{" "}
            </label>
            <input
              type="text"
              placeholder="Username"
              width="80%"
              height="2rem"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              width="80%"
              height="2rem"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              width="80%"
              height="2rem"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button id="signupSubmitButton" onClick={(e) => {}}>
              SingUp
            </button>
            <PasswordChecklist
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
            />
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
              Login
            </label>
            <input
              bg="#222"
              color="white"
              textAlign="center"
              type="email"
              width="40"
              placeholder="enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              bg="#222"
              color="white"
              textAlign="center"
              type="password"
              width="40"
              placeholder="enter Password"
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
              Login
            </button>
            <br />
            <Link exact href="/check" id="link">
              Forget password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
