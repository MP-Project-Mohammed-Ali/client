// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./style.css";
// import NAVBAR from "../Navbar";

// const Admin = () => {
//   const [pendings, setpendings] = useState([]);
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const getPendingHospitals = async () => {
//     try {
//       const result = await axios.get(`${BASE_URL}/allstatuspending`);
//       setpendings(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`${BASE_URL}/updatestatus`, {
//         _id: id,
//         status,
//       });
//       getPendingHospitals();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getPendingHospitals();
//   }, []);