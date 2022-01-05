import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import "./style.css";
import Nav from "../Nav/index";

const Tab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [info,setInfo]=useState([])
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const state = useSelector((state) => {
    return state;
  });
const userIdLocal = localStorage.getItem("id")
  const getTab = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/get/tab`,{
        caseID:params.id,
      }
      ,{ headers: { Authorization: `Bearer ${state.signIn.token}` }} ,
      );
      setData(result.data);
    } catch (error) {

    }
  };
  useEffect(() => {
    
    getTab();
  }, []);
  const createTab = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${BASE_URL}/createtab`,
        {
          title: e.target.title.value,
          Descraption: e.target.desc.value,
          image:e.target.image.value,
          caseID:params.id,
        },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      getTab();
    } catch (error) {
      
    }

  };


  return <div>

<form onSubmit={createTab}>
            <label htmlFor="title"></label>
            <input
              type="text"
              placeholder="اكتب عنوان استشارتك"
              name="title"
              id="inputcase"
            />
             <label htmlFor="image"></label>
            <input
              type="text"
              placeholder="اكتب عنوان "
              name="image"
              id="inputcase"
            />
            <label htmlFor="desc"></label>
            <textarea
              type="text"
              placeholder="اكتب تفاصيل استشارتك هنا"
              name="desc"
              id="inputdesc"
            />
            <button type="submit" id="caseSubmitButton">
              إرسال
            </button>
          </form>
{data && data.map(element=> <>
<h1>{element.title}</h1>


</>)}
  </div>;
};

export default Tab;
