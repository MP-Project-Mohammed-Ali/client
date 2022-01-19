import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./style.css";
import Nav from "../Nav/index";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
const Case = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [updateCasee, setUpdateCasee] = useState("");
  const [Reqiest, setReqiest] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const MySwal = withReactContent(Swal);
  const state = useSelector((state) => {
    return state;
  });

  const getCases = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/createtab`,
        {
          laywer: params.id,
          client: state.signIn.id,
        },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      setData(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCases();
  }, []);

  const sendCase = async (e) => {
    e.preventDefault();
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
      getCases();
      Swal.fire({
        position: "center",
        icon: "success",
        title: " تم ارسال القضية ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "من فضلك قم بتعئة الحقول",
        confirmButtonColor: "black",
      });
    }
  };

  const { id } = useParams();
  const LawyerList = async () => {
    const result = await axios.get(`${BASE_URL}/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${state.signIn.token}`,
      },
    });
    setInfo(result.data);
  };
  useEffect(() => {
    LawyerList();
  }, []);

  return (
    <>
      <Nav navb={true} />
      <div className="home">
        {info.map((infor) => (
          <>
            <div className="bio">
              <img src={infor.img} alt="#" id="imagcase" />
              <h3>{infor.name}</h3>
            </div>
            <div>
              <p className="biotext">{infor.bio}</p>
            </div>
            <form className="informationlawyer">
              <table className="tablecase">
                <tbody>
                  <tr className="trcase">
                    <th className="thcase"> الموهل العلمي</th>
                    <th className="thcase"> التخصص الاكاديمي</th>
                  </tr>
                  <tr>
                    <td className="tdcase">{infor.Qualification}</td>
                    <td className="tdcase">{infor.Education}</td>
                  </tr>
                  <tr>
                    <th className="thcase"> الخبرة </th>
                    <th className="thcase"> المسارات القانونية </th>
                  </tr>
                  <tr className="trcase">
                    <td className="tdcase">{infor.FieldOfExpertise}</td>
                    <td className="tdcase">{infor.Trackslegal}</td>
                  </tr>
                </tbody>
              </table>
            </form>
            {state.signIn.id != params.id ? (
              <button
                onClick={() => setReqiest(true)}
                className="caseSubmitButton"
              >
                {" "}
                طلب استشارة
              </button>
            ) : (
              <></>
            )}
          </>
        ))}

        {Reqiest ? (
          <div className="request">
            <form onSubmit={sendCase} className="lablecase">
              <input
                type="text"
                placeholder="اكتب عنوان استشارتك"
                name="title"
                id="inputcase"
              />
              <textarea
                type="text"
                placeholder="اكتب تفاصيل استشارتك هنا"
                name="desc"
                className="inputdesc"
              />
              <button type="submit" className="subcaseSubmitButton">
                إرسال
              </button>

              <button
                onClick={() => setReqiest(false)}
                className="subcaseSubmitButton"
              >
                إلغاء
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Case;
