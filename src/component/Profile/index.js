import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Nav from "../Nav";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";
import { ImUser } from "react-icons/im";
import { MdTitle, MdEmail } from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [casees, setCases] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const MySwal = withReactContent(Swal);
  const state = useSelector((state) => {
    return state;
  });

  const { id } = useParams();
  useEffect(() => {
    bio();
    cases();
  }, []);

  const bio = async () => {
    await axios
      .get(`${BASE_URL}/profile/${id}`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      })
      .then((result) => {
        setUser(result.data);
      });
  };

  const cases = async () => {
    await axios
      .get(`${BASE_URL}/show/case/${id}`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      })
      .then((result) => {
        if (state.signIn.role == ROLE) {
          setCases(
            result.data.filter((item) => item.laywer == state.signIn.id)
          );
        } else {
          setCases(
            result.data.filter((item) => item.client._id == state.signIn.id)
          );
        }
      });
  };

  const addtab = (caseId) => {
    console.log(id);
    navigate(`/newtab/${caseId}`);
  };

  return (
    <>
      <Nav navb={true} />
      <div className="wrapperprofile" dir="ltr">
        <div dir="rtl" className="infoprofile">
          <h2 className="h2list">قائمة القضايا</h2>
        </div>
        <div className="mainwrapperprofile">
          <div className="mainwrapperprofile1">
            {casees.map((item) => {
              return (
                <div className="full">
                  <div className="nameproileandimage">
                    <MdTitle />
                    <h3 className="profiletextinfo"> {item.title}</h3>
                  </div>
                  {/* </div > */}
                  <div className="nameproileandimage">
                    <ImUser />
                    <h5 className="profiletextinfo"> {item.client.name}</h5>
                  </div>
                  <div className="nameproileandimage">
                    <MdEmail />
                    <h6 className="profiletextinfo"> {item.client.email}</h6>
                  </div>
                  <div className="nameproileandimage">
                    <GrStatusUnknown />
                    <h4 className="profiletextinfo">{item.status.status}</h4>
                  </div>
                  <button
                    className="proSubmitButton"
                    onClick={() => {
                      addtab(item._id);
                    }}
                  >
                    تفاصيل القضية
                  </button>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
