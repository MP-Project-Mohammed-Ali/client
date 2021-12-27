import React, { useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {signIn} from "../../Reduser/login"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal =withReactContent(Swal)
import { login1 } from "../../Reduser/login";

const BASE_URL=process.env.REACT_APP_BASE_URL

const Login =()=>{
    // const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMassage]=useState("")

    const state = useSelector((state) => {
        return {
          token: state.signIn.token,
        };
      });
    
      const login = async()=>{
        setMassage('')
        try{
            const result =await axios.post(`${BASE_URL}/login/new`,{
                email,
                password,
            })
            dispatch(login1({role:result.data.result.role,token:result.data.token}))
            navigate('/') } catch(err){
                setMassage(err.res)
            }
      }
}

export default Login;