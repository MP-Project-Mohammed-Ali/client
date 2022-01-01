import React, { useEffect, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
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
      navigate("/active");
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
    <div>
      <div className="bigwrapper">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="singup">
            <form>
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
              <button
                id="signupSubmitButton"
                onClick={(e) => {
                  e.preventDefault();
                  signUp(e);
                }}
              >
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
                    const button = document.querySelector(
                      "#signupSubmitButton"
                    );
                    button.disabled = false;
                  } else {
                    const button = document.querySelector(
                      "#signupSubmitButton"
                    );
                    button.disabled = true;
                  }
                }}
              />
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
              <button id="signupSubmitButton">Login</button>
              <br />
              <Link exact href="/check">
                Forget password
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
