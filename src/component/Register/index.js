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
// const MySwal =withReactContent(Swal)

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
        // role:process.env.REACT_APP_USER_ROLE
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
      // setMessage(result.data.message);

      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Already Registed",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      {/* <Box
        borderRadius="4px"
        border="solid silver"
        textAlign="center"
        w="400px"
        mt="100px"
        textAlign="center"
        ml="450px"
        bg="#fffb"
        color="black" 
      > */}

      <div className="Box">
        <VStack mt="3">
          <h1>Register</h1>
          {state.token ? (
            <h1>
              {/* <div className="centerWrapper">
                <div className="homeSignupButtons">
                  <button onClick={() => navigate("/")}>HOME</button>
                </div>
              </div> */}
            </h1>
          ) : (
            <main className="main">
              <div className="signupPanel__half signupHalf--second">
                {/* <h2>Signup</h2> */}
                {message ? <div className="message">{message}</div> : ""}

                <Box className="signupInput">
                  <Input
                    type="text"
                    placeholder="Username"
                    width="80%"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <Input
                    type="text"
                    placeholder="Email"
                    width="80%"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    width="80%"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <Button
                    id="signupSubmitButton"
                    onClick={(e) => {
                      e.preventDefault();
                      signUp(e);
                    }}
                  >
                    SingUp
                  </Button>

                  {/* <label>التسجيل ك</label>
               <input type="radio" id="under_13" defaultValue="under_13" name="user_age" /><label htmlFor="under_13" className="light">محامي</label><br />
               <input type="radio" id="over_13" defaultValue="over_13" name="user_age" /><label htmlFor="over_13" className="light">مستخدم</label> */}
                </Box>
              </div>
            </main>
          )}
        </VStack>
        <Box id="check">
          <div className="role">
            <PasswordChecklist
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

            <Link id="loginButton" onClick={() => navigate("/login")}>
              login page
            </Link>
          </div>
        </Box>
      </div>
      {/* </Box> */}
    </ChakraProvider>
  );
};

export default Register;

{
  /* <div>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="style.css" />
        <title>Login page</title>
        <section className="login">
          <div className="container">
            <div className="back">
              <div className="singup">
                <h2>Dont have account ?</h2>
                <button id="signup">sign Up</button>
              </div>
              <div className="signin">
                <h2>Have an account ?</h2>
                <button id="login">Login</button>
              </div>
            </div>
            <div className="front">
              <div className="formin">
                <form>
                  <h2>Login</h2>
                  <input type="text" placeholder="User Name" />
                  <input type="password" placeholder="Password" />
                  <button>Sign In</button>
                </form>
              </div>
              <div className="formUp">
                <form>
                  <h2>Sign Up</h2>
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="E-mail" />
                  <input type="password" placeholder="Password" />
                  <button>Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div> */
}
