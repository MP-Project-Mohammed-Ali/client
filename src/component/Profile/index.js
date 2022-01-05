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

const Profile = () => {
  const [user, setUser] = useState([]);
  const [casees, setCases] = useState([]);
  const [tap, setTap] = useState("");
  const navigate = useNavigate();
  const [Reqiest, setReqiest] = useState(false);
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
        console.log(result.data);
      });
    console.log(id);
  };

  const cases = async () => {
    await axios
      .get(`${BASE_URL}/show/case/${id}`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      })
      .then((result) => {
        console.log(result.data);

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
      <Nav />
      <div className="wrapperprofile" dir="ltr">
        {/* <form className="infobio"> */}
        
        <table dir="rtl" id="customers">
          <tbody>
            <h4>القضايا</h4>
        <tr className="trprofile">
        <th className="thcase">القضايا</th>
      
        </tr>
        <tr>
          
        <th className="thmore">عنوان القضية</th>
          <th className="thmore">اسم المرسل</th>
          <th className="thmore">ايميل المرسل</th>
          <th className="thmore">حالة القضية  </th>
        </tr>
        
        {casees.map((item) => (
          <>
          <tr className="trprofile">
            
            <td className="tdmore"> {item.title}</td>
            <td className="tdmore">{item.client.name}</td>
            <td className="tdmore">{item.client.email}</td>
            <td className="tdmore">{item.status.status}</td>
          <tr className="trprofile">
            <button
            className="proSubmitButton"
              onClick={() => {
                addtab(item._id);
              }}
            >
               تفاصيل القضية
            </button>
            </tr>
          </tr>
          </>
        ))}
        
        
        </tbody>
        </table>
        <table dir="rtl" className="infoprofile">
          <tbody>
          <tr className="trprofile">
        <th className="thcase">المعلومات الشخصية </th>
      </tr>
        {user.map((item) => (
          <div>
            <tr>
            <td className="tdprofile"> الأسم :{item.name} </td>
            </tr>
            <tr>
            <td className="tdprofile">الأيميل :{item.email} </td>
            </tr>
            
          </div>
          
          
        ))}
        </tbody>
          </table>
        
        {/* </form> */}
      </div>
      </>



      
    
  );
};
export default Profile;
