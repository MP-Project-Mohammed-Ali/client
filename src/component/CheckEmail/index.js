import React, { useState } from "react";
import axios from "axios";
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
import { Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import Nav from "../Nav";

const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Reset = () => {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const checkemail = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/check`, {
        email: email,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Email was sent",
        showConfirmButton: false,
        timer: 1500,
      });
      nav("/reset");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, please try again.",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <><Nav navb={true}/>
    <div className="checkwraper">
      {/* <ChakraProvider>
        <Box
          borderRadius="3px"
          border="solid silver"
          textAlign="center"
          w="35%"
          mt="100px"
          textAlign="center"
          ml="500px"
          bg="#fffb"
          color="black"
        > */}
      <div>
        
        <form className="formcheck">
          <h1 id="">استعادة كلمة المرور</h1>
          <input
            id="inputchek"
            type="email"
            placeholder="من فضلك ادخل الايميل"
            onChange={(e) => {
              
              setEmail(e.target.value);
            }}
          ></input>
          <button className="checkSubmitButton" onClick={(e)=>{
            e.preventDefault()
            checkemail(e)}
          } 
            >
            استعد كلمة المرور
          </button>
          </form>
        {/* </Box>
      </ChakraProvider> */}
    </div>
    </div>
    </>
  );
};

export default Reset;
