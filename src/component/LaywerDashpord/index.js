import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { logout1 } from "../../Reducers/login";
import { useNavigate } from "react-router-dom";

function DashbordCase() {
  const [cases, setCases] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const getCases = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/laywer/case`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });
      setCases(result.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    getCases();
  }, []);
  const updateUserRole = async (id, status) => {
    try {
      const updateCase = await axios.put(
        `${BASE_URL}/chang/case/${id}`,
        {
          status_id: status,
        },

        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      getCases();
    } catch (error) {
    }
  };

  const logout = () => {
    dispatch(logout1({ role: "", token: "" }));
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      {cases.map((list) => (
        <>
          <h3>List Cases</h3>
          <h1>{list.title}</h1>
          <h2>{list.name}</h2>
          <button
            onClick={() =>
              updateUserRole(list._id, process.env.REACT_APP_APPROVED)
            }
          >
            approve
          </button>
          <button
            onClick={() =>
              updateUserRole(list._id, process.env.REACT_APP_REJECTED)
            }
          >
            rejected
          </button>
          
        </>
      ))}
      <button id="logoutSubmitButton" bg="red" bgSize="3%" onClick={logout}>
          تسجيل خروج
        </button>
    </>
  );
}

export default DashbordCase;
