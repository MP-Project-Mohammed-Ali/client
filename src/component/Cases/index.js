import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./style.css";

const Case = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [Reqiest, setReqiest] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const state = useSelector((state) => {
    return state;
  });
  console.log(state.signIn);
  const getCases = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/show/allcase`, {
        laywer: params.id,
        client: state.signIn.id,
      });
      console.log("test", result);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCases();
  }, []);

  const sendCase = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    try {
      const result = await axios.post(
        `${BASE_URL}/addcase`,
        {
          title: e.target.title.value,
          Descraption: e.target.desc.value,
          laywer: params.id,
          client: state.signIn.id,
        },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );

      console.log("test", result.data);
      getCases();
    } catch (error) {
      console.log(error);
    }

  };
  const deleteCase = async (_id) => {
    try {
      const delresult = await axios.delete(`${BASE_URL}/delete/case/${_id}`,{
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      console.log( "this data",delresult);
      getCases();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home">
      <h1>اكتب استشارتك هنا </h1>
      <div className="caselist">
        {data.map((caase) => (
          <ol id="listcase">
            <li>{caase.title}</li>
            <li>
              <button
                onClick={() => {
                  deleteCase(caase._id);
                }}
              >
                delete
              </button>
            </li>
          </ol>
        ))}
        <div className="butt">
          <button onClick={() => navigate("/show")} id="caseSubmitButton">
            رجوع
          </button>
          <button onClick={() => setReqiest(true)} id="caseSubmitButton">
            {" "}
            أضف قضية{" "}
          </button>
        </div>
      </div>
      {Reqiest ? (
        <div className="request">
          <form onSubmit={sendCase}>
            <label htmlFor="title"></label>
            <input
              type="text"
              placeholder="اكتب عنوان استشارتك"
              name="title"
              id="inputcase"
            />
            <label htmlFor="desc"></label>
            <input
              type="text"
              placeholder="اكتب تفاصيل استشارتك هنا"
              name="desc"
              id="inputdesc"
            />
            <button type="submit" id="caseSubmitButton">
              إرسال
            </button>
          </form>
          <button onClick={() => setReqiest(false)} id="caseSubmitButton">
            إالغاء
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Case;
