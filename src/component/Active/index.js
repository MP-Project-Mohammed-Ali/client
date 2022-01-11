import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import Nav from "../Nav/index";
import "./style.css"
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
// import Nav from "../Nav";
const MySwal = WithReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Active = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const verifyAccount = async () => {
    if (code.length > 0) {
      try {
        const result = await axios.post(`${BASE_URL}/active`, {
          id,
          code,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "your account has been verified",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Ops...",
          text: "worng code ",
          confirmation: "yellow",
        });
      }
    }
  };
  return (
    <>
    <Nav navb={true}/>
    <Box
      borderRadius="3px"
      border="solid silver"
      textAlign="center"
      w="400px"
      mt="100px"
      textAlign="center"
      ml="500px"
      bg="#fffb"
      color="black"
    >
      <h1>تفعيل الحساب</h1>
      <Box  m="20px" display="inline">
        <ReactCodeInput
         fields={4}
          position="center"
          ml="20px"
         
          onComplete={(e) => {
            setCode(e);
          }}
        />
      </Box>
      <button className="checkSubmitButtonforactive" bg="#777" onClick={verifyAccount}>
        {" "}
        تفعيل
      </button>
    </Box>
    </>
  );
};

export default Active;
