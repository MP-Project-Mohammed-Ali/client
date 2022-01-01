import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import PasswordChecklist from "react-password-checklist";
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
    <ChakraProvider theme={theme}>
      <Box
        borderRadius="3px"
        border="solid silver"
        textAlign="center"
        w="400px"
        mt="100px"
        textAlign="center"
        ml="450px"
        bg="#fffb"
        color="black"
      >
        <VStack mt="4">
          <h1>Reset Your Password</h1>
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
                const button = document.querySelector("#resetPasswordButton");
                button.disabled = false;
              } else {
                const button = document.querySelector("#resetPasswordButton");
                button.disabled = true;
              }
            }}
          />
          <Input
            bg="#222"
            color="white"
            textAlign="center"
            width="40"
            type="password"
            placeholder="Password"
            className="resetPassword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
          <Button bg="#777" id="resetPasswordButton" onClick={resetPassword}>
            Reset
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
export default ResetPassword;
