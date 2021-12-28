import React, { useState } from 'react';
import axios from 'axios';
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
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';



const MySwal = withReactContent(Swal);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

const Reset = () => {


  const [email, setEmail] = useState('');
  const checkemail = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/check`, {
        email: email,
      });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Email was sent',
      showConfirmButton: false,
      timer: 1500,
    });
      
    } catch (error) {
       MySwal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Something went wrong!, please try again.',
         confirmButtonColor: 'black',
       });
    }
    
  };

  return (
    <ChakraProvider>
      <Box
        borderRadius="3px"
        border="solid silver"
        textAlign="center"
        w="300px"
        mt="100px"
        textAlign="center"
        ml="500px"
        bg="#fffb"
        color="black"
      >
        <h1>Reset Password</h1>
        <Input
          m="10px"
          bg="#222"
          color="white"
          textAlign="center"
          type="email"
          width="40"
          placeholder="Your Email"
          onChange={e => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Button bg="#777" onClick={checkemail} mt="20px">
          Send reset code
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default Reset;
