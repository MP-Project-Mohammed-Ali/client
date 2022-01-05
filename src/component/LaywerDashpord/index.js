import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { logout1 } from "../../Reducers/login";
import { useNavigate } from "react-router-dom";
import "./style.css"
import Nav from "../Nav";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";


function DashbordCase() {
  const [cases, setCases] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getCases();
  }, []);

  const getCases = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/laywer/case`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });
      setCases(result.data);
      console.log(result.data);
      
    } catch (error) {
    }
  };
  
 
  console.log(cases);
  const updateUserRole = async (id, status) => {
    try {
      const updateCase = await axios.put(
        `${BASE_URL}/chang/case/${id}`,
        {
          status_id: status,
        },

        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم قبول القضية ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "حدث خطأ ",
        confirmButtonColor: "black",
      });
    } 
      getCases();
    
  };
  const updateUserRole1 = async (id, status) => {
    try {
      const updateCase = await axios.put(
        `${BASE_URL}/chang/case/${id}`,
        {
          status_id: status,
        },

        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      Swal.fire({
        position: "center",
        icon: "wrong",
        title: "تم رفض القضية ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "حدث خطأ ",
        confirmButtonColor: "black",
      });
    } 
      getCases();
    
  }
  const logout = () => {
    dispatch(logout1({ role: "", token: "" }));
    localStorage.clear();
    navigate("/");
  };
  return (
    
    <>
    <Nav />
    <h4>ListCases</h4>

      {cases.map((list) => (
        <>
        
        <table className="tablecase">
        <tbody>
        <tr >
        
          <th >{list.title}</th>
          </tr>
          <tr>
          <th >{list.client.name}</th>
         
        </tr>
        <tr>
        <th>{list.client.email}</th>
        </tr>
        <tr>
        <td><button
            onClick={() =>
              updateUserRole(list._id, process.env.REACT_APP_APPROVED)
            }
            id="checkSubmitButton"
          >
             قبول القضية
          </button></td>
        <td><button
            onClick={() =>
              updateUserRole1(list._id, process.env.REACT_APP_REJECTED)
            }
            id="checkSubmitButton"
          >
            رفض القضية
          </button></td>
        </tr>
        </tbody>
        </table>
        </>
      ))}
    </>
  );
}

export default DashbordCase;
