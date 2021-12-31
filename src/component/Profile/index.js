// import React from 'react'
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { login1 } from "../../Reducers/login";

// const Profile = () => { 
//   const navigate = useNavigate();
//   const [account, setAccount] = useState([]);
//   const [local, setLocal] = useState([]);
//   const [edit, setEdit] = useState("");

//   const BASE_URL = process.env.REACT_APP_BASE_URL;
//   const getData = async () => {
//   const state = useSelector((state) => {
//     return { id: state.signIn.id };
//   });
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     setLocal(id);
//   }, []);

 

//    console.log(id);

//     if(id){
//     const item = await axios.get(
//       `${BASE_URL}/profile${email}`
//     );
//     dispatch(
//       login1({
//         id: item.data.result._id,
//       })
//     )
//     console.log(item);
//     setAccount(item.data);} else {
//     // navigate('/home')
//   }
//   };


//   // const getDataLS = () => {
//   //   setLocal(JSON.parse(localStorage.getItem("id")));
//   // };

//   // useEffect(() => {
//   //   getDataLS();
//   // }, []);

//   useEffect(() => {
//     getData();
//     // eslint-disable-next-line
//   }, [local]);



//   // const editName = async (e) => {
//   //   e.preventDefault();
//   //   if (edit.length > 0) {
//   //      const editFullName = await axios.put(`${BASE_URL}/${local.email}`, {
//   //       fullName: edit,
//   //       });
//   //       console.log(editFullName);
//   //       document.getElementById("user")
//   //       getData();
//   //     } else {
//   //       console.log("");
//   //     }
//   // };
//   const kick =()=>{
//     // eslint-disable-next-line
//     localStorage. clear()
//      navigate("/login");
//     }

//   return (
//     <div>
//       <h1>Hello</h1>

//       {account.map((item, i) => {
//         return (
//           <section className="section-login vvv">
//           <div key={i} className="login-box">
//             <form className={"form"} >
      
//               <div className="input-field">
//               {/* <input type="submit" value="Changing name" onClick={editName}  className="show"/> */}
//               </div>
//               <div className="input-field">
//               <input type="text" placeholder="Changing You username" onChange={(e) => setEdit(e.target.value)} className="show"/>
//               </div>
//             <h1>Name: {item.name}</h1>
            
            
//             <h1>Email: {item.email}</h1>
            
            
           
//             <button className="btn btn-danger btn-block" onClick={kick}>Logout</button>

            
//             </form>
//           </div>
//           </section>
//         );
//       })}
//     </div>
//   );
// };

// export default Profile


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
  Input,
  Button,
  Link,
  Image,
  HStack,
} from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState('');
  const state = useSelector(state => {
    return {
      id: state.signIn.id,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    await axios
      .get(`http://localhost:4000/profile/${id}`, {
        headers: { authorization: `Bearer ${state.signIn.token}` },
      })
      .then(result => {
        setUser(result.data);
        console.log(result.data);
      });

    console.log(id);
  };
  return (
    <Box>
      <div>
        {user.length &&
          user.map(e => (
            <VStack>
              <Box border="solid gray 2px" w="60" h="100">
                {' '}
                <>
                  <Image
                    display="inline"
                    w="5"
                    borderRadius="full"
                    align="center"
                    w="30"
                    h="30"
                    src={e.img}
                  /> <Text>{e.email}</Text>
                  <Text>{e.name}</Text>
                 
                </>
              </Box>
            </VStack>
          ))}
      </div>
    </Box>
  );
};

export default Profile;



