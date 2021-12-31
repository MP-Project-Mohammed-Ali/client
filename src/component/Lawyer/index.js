import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { logout1 } from "../../Reducers/login";
import { list } from "@chakra-ui/react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
  Input,
  Button,
  Link,
  Image,
  HStack,
  ListItem
} from '@chakra-ui/react';

const Laywer = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const [lawyer, setLawyer] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  console.log(state.signIn.token);

  useEffect(() => {
    LawyerList();
  }, []);

  const LawyerList = async () => {
    const result = await axios.get(`${BASE_URL}/show/alluser`);
    setLawyer(result.data.filter((item) => item.role == ROLE));
    console.log(result.data.filter((item) => item.role == ROLE));
    
  };

  const logout = () => {
    dispatch(logout1({ role: "", token: "" }));
    localStorage.clear();
    navigate("/");
  };

  const move = (id) => {
    navigate(`/cases/${id}`);
  };

  return (
    <>
    
    <div className="Nav">
      <h1>المحامين والمستشارين</h1>
      </div>
{/* 
      <div className="posthome">
        <div className="post">
          <div className="test"> */}
        <div className="mainwrapper">
        
          {lawyer.map((user) => (
            <div className="list"> 
             <div className="LineOne">
             <img src={user.img} alt="#" id="imag" />
            <h4 id="name">{user.name}</h4>
              </div>
              
            <div className="LineTwo">
             {/* <td> <h4>{user.bio}</h4></td> */}
              <h5 id="degeename">  تخصص :{user.Qualification}</h5>
              <h5> النوع :{user.Trackslegal}</h5> 
             {/* <td>  <h5>{user.Education}</h5> </td> */}
              </div>
              {/* <h6> {user.FieldOfExpertise} </h6> */}
             
              
              <button id="button"
              onClick={() => move(user._id)}>الأتعاب المالية {user.name} </button>
              
            </div>
          ))} 
          </div>
          <button 
          bg="red"
          bgSize="3%"
          id="logbut" onClick={logout}>
        تسجيل خروج
      </button>
          {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default Laywer;
