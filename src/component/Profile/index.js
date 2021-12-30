import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";


const Profile = () => { 
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [local, setLocal] = useState([]);
  const [edit, setEdit] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const getData = async () => {
   
    if(local){
    const item = await axios.get(
      `${BASE_URL}/${local.email}`
    );
    setAccount(item.data);} else {
    // navigate('/home')
  }
  };


  const getDataLS = () => {
    setLocal(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    getDataLS();
  }, []);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [local]);



  const editName = async (e) => {
    e.preventDefault();
    if (edit.length > 0) {
       const editFullName = await axios.put(`${BASE_URL}/${local.email}`, {
        fullName: edit,
        });
        console.log(editFullName);
        document.getElementById("user")
        getData();
      } else {
        console.log("");
      }
  };
  const kick =()=>{
    // eslint-disable-next-line
    localStorage. clear()
     navigate("/login");
    }

  return (
    <div>
      {account.map((item, i) => {
        return (
          <section className="section-login vvv">
          <div key={i} className="login-box">
            <form className={"form"} >
      
              <div className="input-field">
              <input type="submit" value="Changing name" onClick={editName}  className="show"/>
              </div>
              <div className="input-field">
              <input type="text" placeholder="Changing You username" onChange={(e) => setEdit(e.target.value)} className="show"/>
              </div>
            <h1>Name: {item.fullName}</h1>
            
            
            <h1>Email: {item.email}</h1>
            
            
           
            <button className="btn btn-danger btn-block" onClick={kick}>Logout</button>

            
            </form>
          </div>
          </section>
        );
      })}
    </div>
  );
};

export default Profile






