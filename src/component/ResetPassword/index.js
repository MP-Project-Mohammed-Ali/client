import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import Nav from "../Nav";
import "./style.css";
import { ChakraProvider, VStack, theme, Button, Input } from "@chakra-ui/react";

const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    if (code.length > 0) {
      try {
        await axios.post(`${BASE_URL}/reset`, {
          id,
          code,
          password,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your password has been reset ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } catch (error) {}
    }
  };
  return (
    <>
      <Nav navb={true} />
      <ChakraProvider theme={theme}>
        <form className="resetpassword">
          <VStack mt="4">
            <h1>استعادة كلمة المرور</h1>

            <Input
              bg="#222"
              color="white"
              textAlign="center"
              width="40"
              type="password"
              placeholder="كلمة المرور"
              className="resetPassword"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
            <Button bg="#777" id="resetPasswordButton" onClick={resetPassword}>
              استعادة
            </Button>
          </VStack>
        </form>
      </ChakraProvider>
    </>
  );
};
export default ResetPassword;
