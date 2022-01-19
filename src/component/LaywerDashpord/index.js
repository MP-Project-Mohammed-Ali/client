import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout1 } from "../../Reducers/login";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Nav from "../Nav";
import Swal from "sweetalert2";
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
    } catch (error) {}
  };

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
        icon: "error",
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
  };

  return (
    <>
      <Nav navb={true} />
<div className="mainwraperlistlawyer">
      <h2 className="titellistcaseforlawyer">قائمة الطلبات</h2>
      <div className="listcaseforlawyer">
        {cases.map((list) => (
          <>
           
            <div className="listcard">
            <h4>القضية : {list.title}</h4>
            <h4> التفاصيل :{list.Descraption}</h4>
            <h4>المرسل : {list.client.name}</h4>
            <h4>الايميل : {list.client.email}</h4>
            
            <div className="butonscases">
            <button
              onClick={() =>
                updateUserRole(list._id, process.env.REACT_APP_APPROVED)
              }
              className="checkSubmitButton"
            >
              قبول القضية
            </button>
            <button
              onClick={() =>
                updateUserRole1(list._id, process.env.REACT_APP_REJECTED)
              }
              className="checkSubmitButton1"
            >
              رفض القضية
            </button>
            </div>
            </div>
          </>
        ))}
        </div>
     </div>
    </>
  );
}

export default DashbordCase;
