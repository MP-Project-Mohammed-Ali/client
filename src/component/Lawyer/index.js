import React from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
// import "./style.css";
import { useNavigate } from "react-router-dom";
import { logout1 } from "../../Reducers/login";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE=process.env.REACT_APP_LAWYER_ROLE
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
    console.log(result.data);
    
    // if(result.data.role=="61c80a2efa23f676528d6258"){
        
    // }
    // .filter(ROLE=="61c80a2efa23f676528d6258")
    setLawyer(result.data)
  };
  

    const logout = () => {
      dispatch(logout1({role:"",token:""}))
      localStorage.clear();
      navigate("/");
    };
    const move=()=>{
        navigate('/cases')
    }
 

  return (

    <><button id="logbut"
    onClick={logout}>Exit</button>
    
    <h2>Post</h2>
    
    <div className="posthome">
      <div className="post">
      {lawyer.map((e) => (
        <div className="listphoto">
        <ul>
          <li>
              <h1> {e.name} </h1>
              <button 
    onClick={move}
    >jjj</button>
           <h3> {e.email}  </h3>
           
           
            
          </li>
          {console.log()}{" "}
        </ul>
        

         
        </div>
        
      ))}
      
      </div>
    </div>
    </>
  );
};

export default Post;
