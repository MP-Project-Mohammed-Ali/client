// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector,useDispatch } from "react-redux";
// import {signIn} from "../../Reduser/login"
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal =withReactContent(Swal)
// import { login1 } from "../../Reduser/login";

// const BASE_URL=process.env.REACT_APP_BASE_URL

// const Login =()=>{
//     // const [name,setName]=useState("")
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [message,setMassage]=useState("")

//     const state = useSelector((state) => {
//         return {
//           token: state.signIn.token,
//         };
//       });
    
//       const login = async()=>{
//         setMassage('')
//         try{
//             const result =await axios.post(`${BASE_URL}/login/new`,{
//                 email,
//                 password,
//             })
//             dispatch(login1({role:result.data.result.role,token:result.data.token}))
//             navigate('/') } catch(err){
//                 setMassage(err.res)
//             }
//       }
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login1 } from '../../Reducers/login';
import { useNavigate } from 'react-router'

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
import { Navigate } from 'react-router-dom';
const MySwal = withReactContent(Swal);

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [local, setLocal] = useState('');
  const state = useSelector(state => {
    return {token:state.signIn.token}
  });
  console.log(state);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLocal(token);
  }, []);
  const logIn = async () => {
    try {
      const result1 = await axios.post(`${BASE_URL}/login/new`, {
        email,
        password,
        
      });
      navigate("/show")
      console.log(result1.data.result._id);
      dispatch(login1({role: result1.data.result.role,token:result1.data.token,id:result1.data.result._id}));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500,
      });
      
    } catch (error) {
       MySwal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'worng Email or password',
         confirmButtonColor: 'black',
       });
      
    }
    
  };



  return (
    <ChakraProvider theme={theme}>
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
        <VStack mt="4">
          {!state.token ? (
            <div className="mainDiv">
              <h1>Login</h1>
              <VStack mt="4">
                <Input
                  bg="#222"
                  color="white"
                  textAlign="center"
                  type="email"
                  width="40"
                  placeholder="enter Email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
                <br />

                <Input
                  bg="#222"
                  color="white"
                  textAlign="center"
                  type="password"
                  width="40"
                  placeholder="enter Password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />

                <br />
                <Button bg="#777"  onClick={logIn}>
                  Login
                </Button>
                <Link exact href="/check">
                  Forget password
                </Link>
                <br />
              </VStack>
            </div>
          ) : (
            <h3></h3>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Login;