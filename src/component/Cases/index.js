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
  const [info,setInfo]=useState([])
  const [updateCasee, setUpdateCasee] = useState("");
  const [Reqiest, setReqiest] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const state = useSelector((state) => {
    return state;
  });

  const getCases = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/show/allcase`, {
        laywer: params.id,
        client: state.signIn.id,
      },{ headers: { Authorization: `Bearer ${state.signIn.token}` }} ,
      );
      setData(result.data);
    } catch (error) {

    }
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
    } catch (error) {
      
    }

  };


  const deleteCase = async (_id) => {
    try {
      const delresult = await axios.delete(`${BASE_URL}/delete/case/${_id}`,{
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      getCases();
    } catch (error) {
     
    }
  };


  const UpdateCase =async (id)=>{
    
   const resUpdate=await axios.put(`${BASE_URL}/chang/case/${id}`,{
    Descraption:updateCasee
   },
   {
    headers: {
      Authorization: `Bearer ${state.signIn.token}`,
    },
   }
   )
   getCases();
  }
  const { id } = useParams();
  const LawyerList = async () => {
    const result = await axios.get(`${BASE_URL}/profile/${id}`,{
      headers: {
        Authorization: `Bearer ${state.signIn.token}`,
      }
    });
    setInfo(result.data);
  };
  useEffect(() => {
    LawyerList();
  }, []);

  return (
    <>
    
    <div className="home">
    {info.map((infor)=>(
      <>
      <div className="bio">
      <img src={infor.img} alt="#" id="imagcase" />
      <h3>{infor.name}</h3>
      {/* <div>
        <h6>{infor.price}</h6>
      </div> */}
      </div>
      <div>
        <p className="biotext">{infor.bio}</p>
      </div>
      <form className="informationlawyer">
      <table>
        <tbody>
        <tr>
          <th> الموهل العلمي</th>
          <th> التخصص الاكاديمي</th>
        </tr>
        <tr>
        <td>{infor.Qualification}</td>
        <td>{infor.Education}</td>
        </tr>
        <tr>
          <th> الخبرة </th>
          <th> المسارات القانونية </th>
        </tr>
        <tr>
        <td>{infor.FieldOfExpertise}</td>
        <td>{infor.Trackslegal}</td>
        </tr>
        <button onSubmit={() => setReqiest(true)} id="caseSubmitButton">
            {" "}
            طلب استشارة 
          </button>
        </tbody>
      </table>
      
      </form>
      
      </>
    ))}
     
      <div className="caselist">
        
        {data.map((caase) => (
          <ol id="listcase">
            <li>{caase.title}</li>
            <br/>
            <li>{caase.Descraption}</li>
            <li>
              <button
                onClick={() => {
                  deleteCase(caase._id);
                }}
              >
                delete
              </button>
              
            </li>
            <li>
            <input
                    className="inpup"
                    onChange={e => {
                      setUpdateCasee(e.target.value);
                    }}
                    placeholder="update"
                  />
                  <button className="upBTN" onClick={() => UpdateCase(caase._id)}>
                    update
                  </button>{' '}
            </li>
          </ol>
        ))}
        <div className="butt">
          <button onClick={() => navigate("/show")} id="caseSubmitButton">
            رجوع
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
          <button onClick={() => setReqiest(false)} id="caseSubmitButton">
            إالغاء
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
    </>
  );
};

export default Case;
