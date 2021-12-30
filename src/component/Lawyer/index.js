import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { logout1 } from "../../Reducers/login";

const Post = () => {
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
      <button id="logbut" onClick={logout}>
        Exit
      </button>

      <div className="posthome">
        <div className="post">
          {lawyer.map((user) => (
            <div className="listphoto">
              {/* <ul>
                <li> */}
              <img src={user.img} alt="#" id="imag" />
              <h6>{user.name}</h6>
              <h4>{user.bio}</h4>
              <h5> {user.Qualification} </h5>
              <h5>{user.Education}</h5>
              <h6> {user.FieldOfExpertise} </h6>
              <h6>{user.Trackslegal}</h6>
              <button onClick={() => move(user._id)}>Conect</button>
              {/* </li> */}
              {console.log()} {/* </ul> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
