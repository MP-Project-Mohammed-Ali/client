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
import { chakra, Box, Image, Flex,ChakraProvider,Stack ,SimpleGrid,Button,useBreakpointValue,Text, VStack,HStack} from "@chakra-ui/react";
import { ImUser } from "react-icons/im";
import { MdTitle,MdEmail } from 'react-icons/md';
import {GrStatusUnknown} from 'react-icons/gr'
// import { MdTitle } from "react-icons/bi";
import{MdOutlineTitle} from "react-icons/gr"

const Profile = () => {
  const [user, setUser] = useState([]);
  const [casees, setCases] = useState([]);
  const [tap, setTap] = useState("");
  const navigate = useNavigate();
  const [edit, setEdit] = useState("");
  const [editEmail, setEmail] = useState("");
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
<Nav navb={true}/>
{/* <>
      <div>
        {user && user[0] ? (
          <>
            <div className="contenerImg">
              <div className="workPls">
                <div className="borderImg">
                  <img className="othersImg" src={user[0].img} alt="img" />
                </div>
                <div> </div>
              </div>
              <h3 className="name"> {user[0].username} </h3>
            </div>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss && (
          <>
            {userPostss.length ? (
              <div className="allImg">
                {userPostss.map((item) => (
                  <>
                    <h4
                      key={item._id}
                      className="profileDes"
                      onClick={() => goInside(item._id)}
                    >
                      {item.describe}
                      {item.img && (
                        <p className="photoPlusProfile"> + Photo </p>
                      )}
                    </h4>
                  </>
                ))}
              </div>
            ) : (
              <p className="noPosted">You don't have any post yet ): </p>
            )}
          </>
        )}
      </div>
    </> */}
<div className="wrapperprofile" dir="ltr">
       
       <div dir="rtl" className="infoprofile">
       <h2 className="h2list">قائمة القضايا</h2>
       
       </div>
       <div className="mainwrapperprofile">
       <div className="mainwrapperprofile1">

         
       {casees.map((item) => {
         return (
           
           <div className="full">
             {/* <div className="profiletitleandimage"> */}
               <div className="nameproileandimage">
               <MdTitle/>
             <h3> {item.title}</h3>
             </div>
             {/* </div > */}
             <div className="nameproileandimage">
             <ImUser/>
             <h5> {item.client.name}</h5> 
             </div>
             <div className="nameproileandimage">
             <MdEmail/>
             <h6> {item.client.email}</h6>
             </div>
             <div className="nameproileandimage">
             <GrStatusUnknown/>
             <h4>{item.status.status}</h4>
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

       
       {/* <table dir="rtl" id="customers">
         <tbody>
           <h4>القضايا</h4>
       <tr className="trprofile">
       <th className="thcase">القضايا</th>
     
       </tr> */}
       {/* <tr>
         
       <th className="thmore">عنوان القضية</th>
         <th className="thmore">اسم المرسل</th>
         <th className="thmore">ايميل المرسل</th>
         <th className="thmore">حالة القضية  </th>
       </tr> */}
       
       {/* {casees.map((item) => ( */}
         <>
         {/* <tr className="trprofile">
           
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
         </tr> */}
         </>
       {/* ))} */}
       
       
       {/* </tbody>
       </table> */}
       {/* <table dir="rtl" className="infoprofile">
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
         </table> */}
       
       {/* </form> */}
     </div>


        </>
  );
};
export default Profile;
