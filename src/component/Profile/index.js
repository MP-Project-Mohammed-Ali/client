import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const state = useSelector((state) => {
    return state;
  });

  const { id } = useParams();
  useEffect(() => {
    bio();
  }, []);
  const bio = async () => {
    await axios
      .get(`${BASE_URL}/profile/${id}`)
      .then((result) => {
        setUser(result.data);
        console.log(result);
      });
    console.log(id);
  };
  return (
      <>
    <h1>hello</h1>
    
    {user.map((item) => (
        <div>
      <h1>{item.name}</h1>
      <h2>
          {item.email}
      </h2>
      </div>
    ))}
</>
  );
};
export default Profile;
