import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function DashbordCase() {
  const [cases, setCases] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const state = useSelector((state) => {
    return state;
  });

  const getCases = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/laywer/case`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });
      console.log("test", result);
      setCases(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCases();
  }, []);
  const updateUserRole = async (id, status) => {
    console.log(status);
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
      console.log(error);
    }
  };
  return (
    <>
      {cases.map((list) => (
        <>
          <h3>List Cases</h3>
          <h1>{list.title}</h1>
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
    </>
  );
}

export default DashbordCase;
